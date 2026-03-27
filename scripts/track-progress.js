const fs = require('fs');
const path = require('path');

class ProgressTracker {
  constructor() {
    this.progressFile = path.join(__dirname, 'progress.json');
    this.historyDir = path.join(__dirname, 'progress-history');
    this.progress = this.loadProgress();
  }

  loadProgress() {
    try {
      const data = fs.readFileSync(this.progressFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.log('创建初始进度文件...');
      return this.createInitialProgress();
    }
  }

  createInitialProgress() {
    const initialProgress = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      phase: 'Phase 1: 学习 + 初始化',
      overallProgress: {
        percentage: 0,
        startDate: new Date().toISOString().split('T')[0],
        targetDate: '2026-05-19',
        currentWeek: 1,
        totalWeeks: 12
      },
      learning: {
        currentTopic: '',
        completedTopics: [],
        nextTopic: '',
        learningLogs: []
      },
      development: {
        completedFeatures: [],
        inProgressFeatures: [],
        pendingFeatures: []
      },
      issues: {
        open: [],
        resolved: []
      },
      checkpoints: {
        lastCheckpoint: new Date().toISOString(),
        nextCheckpoint: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        checkpointProgress: ''
      }
    };

    this.saveProgress(initialProgress);
    return initialProgress;
  }

  saveProgress(progress = this.progress) {
    progress.lastUpdated = new Date().toISOString();

    fs.writeFileSync(
      this.progressFile,
      JSON.stringify(progress, null, 2),
      'utf-8'
    );

    this.backupDaily();
    console.log('✅ 进度已保存:', progress.lastUpdated);
  }

  backupDaily() {
    const today = new Date().toISOString().split('T')[0];
    const backupPath = path.join(this.historyDir, `${today}.json`);

    if (!fs.existsSync(this.historyDir)) {
      fs.mkdirSync(this.historyDir, { recursive: true });
    }

    fs.writeFileSync(
      backupPath,
      JSON.stringify(this.progress, null, 2),
      'utf-8'
    );

    console.log('💾 已备份到:', backupPath);
  }

  addCompletedFeature(feature) {
    const completed = {
      ...feature,
      completedAt: new Date().toISOString(),
      status: 'done',
      tested: feature.tested || false
    };

    this.progress.development.completedFeatures.push(completed);
    this.progress.development.inProgressFeatures = 
      this.progress.development.inProgressFeatures.filter(
        f => f.id !== feature.id
      );

    this.progress.overallProgress.percentage = this.calculateProgress();
    this.saveProgress();
    console.log('✅ 功能完成:', feature.name);
  }

  updateInProgressFeature(featureId, updates) {
    const feature = this.progress.development.inProgressFeatures.find(
      f => f.id === featureId
    );

    if (feature) {
      Object.assign(feature, updates);
      this.saveProgress();
      console.log('🔄 进度已更新:', feature.name);
    } else {
      console.log('❌ 未找到功能:', featureId);
    }
  }

  addIssue(issue) {
    this.progress.issues.open.push({
      ...issue,
      createdAt: new Date().toISOString(),
      status: 'open'
    });
    this.saveProgress();
    console.log('🐛 问题已记录:', issue.title);
  }

  resolveIssue(issueId, solution) {
    const issue = this.progress.issues.open.find(i => i.id === issueId);
    if (issue) {
      issue.status = 'resolved';
      issue.resolvedAt = new Date().toISOString();
      issue.solution = solution;
      
      this.progress.issues.resolved.push(issue);
      this.progress.issues.open = 
        this.progress.issues.open.filter(i => i.id !== issueId);
      
      this.saveProgress();
      console.log('✅ 问题已解决:', issue.title);
    }
  }

  calculateProgress() {
    const totalFeatures = 
      this.progress.development.completedFeatures.length +
      this.progress.development.inProgressFeatures.length +
      this.progress.development.pendingFeatures.length;
    
    const completedFeatures = this.progress.development.completedFeatures.length;
    
    return totalFeatures > 0 ? Math.round((completedFeatures / totalFeatures) * 100) : 0;
  }

  generateReport() {
    const report = {
      date: new Date().toISOString().split('T')[0],
      phase: this.progress.phase,
      overallProgress: this.progress.overallProgress.percentage,
      completedFeatures: this.progress.development.completedFeatures.length,
      inProgressFeatures: this.progress.development.inProgressFeatures.length,
      pendingFeatures: this.progress.development.pendingFeatures.length,
      openIssues: this.progress.issues.open.length,
      currentLearning: this.progress.learning.currentTopic,
      lastUpdated: this.progress.lastUpdated
    };

    console.log('\n📊 开发进度报告');
    console.log('═══════════════════════════');
    console.log(`日期：${report.date}`);
    console.log(`阶段：${report.phase}`);
    console.log(`总体进度：${report.overallProgress}%`);
    console.log(`✅ 已完成：${report.completedFeatures} 个功能`);
    console.log(`⏳ 进行中：${report.inProgressFeatures} 个功能`);
    console.log(`📋 待办：${report.pendingFeatures} 个功能`);
    console.log(`🐛 未解决问题：${report.openIssues} 个`);
    console.log(`📚 当前学习：${report.currentLearning || '无'}`);
    console.log(`最后更新：${report.lastUpdated}`);
    console.log('═══════════════════════════\n');

    return report;
  }

  showStatus() {
    this.generateReport();
  }
}

// 命令行使用
if (require.main === module) {
  const tracker = new ProgressTracker();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'save':
      tracker.saveProgress();
      break;
    case 'report':
      tracker.generateReport();
      break;
    case 'status':
      tracker.showStatus();
      break;
    default:
      console.log('用法：node track-progress.js [save|report|status]');
  }
}

module.exports = ProgressTracker;
