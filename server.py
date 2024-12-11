from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/compute")
def compute():
    # 假设在这里调用您的Python算法，获得HDV数量与Relaxed路径结果
    # 此处为示例数据
    result = {
        "hdv_count": 7,
        "path_count": 3,
        "top_score": 0.25,
        "top_path": [9801185, 9232, 9807158, 8143, 9807024, 107069]
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)