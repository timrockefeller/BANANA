## 速学vue 请
## 关于Markdown画图 参见菜鸟教程[评论区](https://www.runoob.com/markdown/md-advance.html)



```mermaid
gantt
dateFormat  YYYY-MM-DD
title 软件开发甘特图
section week
第一周:active, 2020-04-20,7d
第二周:7d
第三周:7d
section 定义
需求分析           :active,rqmdoc, 2020-04-25, 7d
系统分析文档		  :anadoc, 7d
原型              :dsnptt,after rqmdoc, 3d
section 开发
学习Electron框架   :crit, after rqmdoc, 7d
UI设计            :dsnui, after dsnptt, 4d
系统设计文档		  :dsndoc, after anadoc, 7d
设计框架           :achdsn, after dsndoc, 3d
开发              :coding, after achdsn, 7d
section 测试
功能测试           :qatest, after coding, 3d
压力测试           :after qatest, 2d
测试报告           :2d
```

### 第一周

#### 分工
- 黄子闻
- 翁韬
- 许文瑞
- 杨帅
- 许晨阳
#### 开发计划
- 时间上先按老师给的时间点来吧
- 然后开发主要用Electron+Vue架构
### 第二周
#### 系统原型
##### 数据模型
- 顶层（黄子闻）
- 按功能模块（翁韬）
##### 逻辑模型
- 顶层程序结构图（杨帅）
- 功能模块（许文瑞）
##### 行为模型
- 状态转移图（许晨阳）

### 第三周
#### 系统分析文档
- 系统结构图
> 按模块划分 想接请自己填写

### 第四周
#### 系统设计文档
- 层次图
- HIPO图

### 第八周
> 测试文档5个人分别设计测试用例之后整合
> 用户手册统一编写

## 目前需要确定的事
- 开发架构
- 国标GB/T 8567-2006
