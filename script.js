// 显示参数滑块值
function updateSliderValues() {
    document.getElementById('w1Val').innerText = document.getElementById('w1').value;
    document.getElementById('w2Val').innerText = document.getElementById('w2').value;
    document.getElementById('thetaVal').innerText = document.getElementById('theta').value;
}

// 初始化滑块事件
document.getElementById('w1').addEventListener('input', updateSliderValues);
document.getElementById('w2').addEventListener('input', updateSliderValues);
document.getElementById('theta').addEventListener('input', updateSliderValues);

// 确认按钮逻辑
document.getElementById('confirmBtn').addEventListener('click', () => {
    const dataset = document.getElementById('datasetSelect').value;
    const w1 = document.getElementById('w1').value;
    const w2 = document.getElementById('w2').value;
    const theta = document.getElementById('theta').value;
    const windowSize = document.getElementById('windowSize').value;
    const timeRange = document.getElementById('timeRange').value;
    const mode = document.querySelector('input[name="mode"]:checked').value;

    // 文件上传信息
    const fileInput = document.getElementById('fileUpload');
    let fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "No file";

    console.log("Confirmed parameters:", {dataset, w1, w2, theta, windowSize, timeRange, mode, fileName});
    alert("Configuration confirmed. Now you can run the experiment.");
});

// 运行与停止逻辑
let runInterval = null;
let startTime = null;

document.getElementById('runBtn').addEventListener('click', () => {
    document.getElementById('statusText').innerText = "Running...";
    startTime = Date.now();
    runInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime)/1000).toFixed(1);
        document.getElementById('execTime').innerText = "Execution Time: " + elapsed + "s";
    }, 100);
    
    // 模拟数据处理时间, 3秒后完成
    setTimeout(() => {
        finishExperiment();
    }, 3000);
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if(runInterval) {
        clearInterval(runInterval);
        runInterval = null;
    }
    document.getElementById('statusText').innerText = "Stopped";
    document.getElementById('execTime').innerText = "Execution Time: -";
});

// 实验完成后显示与图匹配的结果与图像
function finishExperiment() {
    if(runInterval) {
        clearInterval(runInterval);
        runInterval = null;
    }
    document.getElementById('statusText').innerText = "Completed";

    // 根据提供的图和场景信息输出结果日志
    // 此图节点1,5,10为HDV，关键边为(1->2) T1, (5->6) T2, (10->11) T3
    // 可对比分析，如此内容更贴合这幅图
    const log = `
Experiment Completed.

Detected HDV Nodes: 1, 5, 10
Critical Edges Across Time:
- T1: (1 -> 2)
- T2: (5 -> 6)
- T3: (10 -> 11)

These critical edges indicate important dynamic changes at different time snapshots.

Relaxed Query Insights:
(Example)
- Potentially highest scoring path involves transitions through HDV nodes (1,5,10) at different times (T1, T2, T3).

No strict HDV path found in this scenario, but Relaxed queries reveal how HDVs guide temporal evolution.
    `;
    document.getElementById('resultsLog').innerText = log;

    // 在图区域显示给定的图像
    const container = document.getElementById('graphContainer');
    container.innerHTML = ""; // 清空占位内容

    const img = document.createElement('img');
    img.src = "temporal_graph_with_labels.png"; 
    container.appendChild(img);

    document.getElementById('execTime').innerText = "Execution Time: " + ((Date.now() - startTime)/1000).toFixed(2) + "s";
}

// 导出结果功能
document.getElementById('downloadResultsBtn').addEventListener('click', () => {
    const logText = document.getElementById('resultsLog').innerText;
    const blob = new Blob([logText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.txt';
    a.click();
    URL.revokeObjectURL(url);
});

// 导出图像功能 (简单方案为直接下载当前图像文件)
document.getElementById('saveImgBtn').addEventListener('click', () => {
    const container = document.getElementById('graphContainer');
    const img = container.querySelector('img');
    if(!img) {
        alert("No graph to save!");
        return;
    }
    const a = document.createElement('a');
    a.href = img.src;
    a.download = 'graph.png';
    a.click();
});

// 关于、帮助按钮简单弹窗
document.getElementById('helpBtn').addEventListener('click', () => {
    alert("Help: Configure parameters and run the experiment.");
});

document.getElementById('aboutBtn').addEventListener('click', () => {
    alert("About: DynaPath v1.0 - Temporal Graph Analyzer.");
});