## 演示例子
 
```
{
	"schema": {
		"type": "object",
		"title": "datasheet",
		"properties": {
			"name": {
				"type": "string",
				"title": "名称"
			},
			"age": {
				"type": "integer",
				"title": "年龄"
			},
			"score": {
				"type": "number",
				"title": "得分"
			},
			"gender": {
				"type": "boolean",
				"title": "性别"
			},
			"description": {
				"type": "null",
				"title": "评价"
			},
			"location": {
				"type": "object",
				"title": "位置",
				"properties": {
					"longitude": {
						"type": "number",
						"title": "经度"
					},
					"latitude": {
						"type": "string",
						"title": "纬度"
					}
				}
			},
			"basicarray": {
				"type": "array",
				"title": "集合1",
				"items": {
					"type": "string",
					"title": "STR"
				}
			}
		}
	},
	"uiSchema": {
		"name": {
			"ui:location": {
				"row": 1,
				"col": 1
			}
		},
		"age": {
			"ui:location": {
				"row": 1,
				"col": 2
			}
		},
		"score": {
			"ui:location": {
				"row": 1,
				"col": 3,
				"colSpan": 2
			}
		},
		"gender": {
			"ui:location": {
				"row": 2,
				"col": 1
			}
		},
		"description": {
			"ui:location": {
				"row": 2,
				"col": 2
			}
		},
		"location": {
			"longitude": {
				"ui:location": {
					"row": 3,
					"col": 1
				}
			},
			"latitude": {
				"ui:location": {
					"row": 3,
					"col": 2
				}
			}
		},
		"basicarray": {
			"ui:location": {
				"row": 4,
				"col": 1,
				"rowSpan": 4,
				"colSpan": 3
			},
			"items": {
				"ui:location": {
					"rowSpan": 1,
					"colSpan": 1,
					"col": 1
				}
			}
		}
	}
}
```