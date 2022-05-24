import React from "react";
import Grid from "@material-ui/core/Grid";
import FixedHeightContainer from "../components/FixedHeightContainer";
import Title from "../components/Title";
import Editor from "@monaco-editor/react";
import CustomForm from "../components/Form/CustomForm";
import Button from "@material-ui/core/Button";
import DataSheet from "../components/DataSheet/components/DataSheet";

export default function () {
  const [schema, setSchema] = React.useState(TestSchema);
  const [uiSchema, setUiSchema] = React.useState(TestUISchema);
  const [formData, setFormData] = React.useState(TestFormData);

  const editorRef = React.useRef(null);
  const uiEditorRef = React.useRef(null);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FixedHeightContainer height={700}>
          <Title>SchemaEditor</Title>
          <p>schema</p>
          {/* monaco editor的onchange函数不够灵活，此处在创建时onMount中绑定到ref，以便后续查询editor中的value */}
          <Editor
            title="Schema"
            language="json"
            value={JSON.stringify(schema, null, "\t")}
            onMount={(editor, monaco) => {
              editorRef.current = editor;
            }}
            onChange={(value, event) => { }}
          />
          <p>ui:schema</p>
          <Editor
            language="json"
            value={JSON.stringify(uiSchema, null, "\t")}
            onMount={(editor, monaco) => {
              uiEditorRef.current = editor;
            }}
            onChange={(value, event) => { }}
          />
          <div>
            {/* 点击apply将schema与uischema传入state，通过editor的ref读取编辑器中的内容 */}
            <Button
              color="primary"
              onClick={() => {
                setSchema(JSON.parse(editorRef.current.getValue()));
                setUiSchema(JSON.parse(uiEditorRef.current.getValue()));
              }}
            >
              apply
            </Button>
          </div>
        </FixedHeightContainer>
      </Grid>
      {/* FSList页面右侧卡片 */}
      <Grid item xs={6}>
        <FixedHeightContainer height={700}>
          <Title>SchemaForm</Title>
          <CustomForm
            onSubmit={({ formData: newFormData }) => {
              setFormData(newFormData)
              alert(JSON.stringify(newFormData, null, 2))
            }}
            schema={schema}
            uiSchema={uiSchema}
          />
        </FixedHeightContainer>
      </Grid>
      <Grid item xs={12}>
        <FixedHeightContainer height={700}>
          <Title>DataSheet</Title>
          <DataSheet schema={schema} uiSchema={uiSchema} formData={formData} />
        </FixedHeightContainer>
      </Grid>
    </Grid>
  )
}

const TestSchema = {
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
    },
    "objectarray": {
      "type": "array",
      "title": "集合2",
      "items": {
        "type": "object",
        "title": "OBJECT",
        "properties": {
          "name": {
            "type": "string",
            "title": "名称"
          },
          "age": {
            "type": "integer",
            "title": "年龄"
          }
        }
      }
    },
    "arrayarray": {
      "type": "array",
      "title": "集合3",
      "items": {
        "type": "array",
        "title": "集合4",
        "items": {
          "type": "string",
          "title": "名称"
        }
      }
    },
    "datasource": {
      "type": "number",
      "title": "数据源"
    },
    "datatarget": {
      "type": "number",
      "title": "值",
      // "dependencies":["datasource"],
      "function": "EqualFunc"
    },
    "item1": {
      "type": "number",
      "title": "值1"
    },
    "item2": {
      "type": "number",
      "title": "值2"
    },
    "sum": {
      "type": "number",
      "title": "总值",
      // "dependencies":["item1","item2"],
      "function": "SumFunc"
    }
  }
};
const TestUISchema = {
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
  },
  "objectarray": {
    "ui:location": {
      "row": 8,
      "col": 1,
      "rowSpan": 4,
      "colSpan": 3
    },
    "items": {
      "name": {
        "ui:location": {
          "rowSpan": 1,
          "colSpan": 1,
          "col": 1
        }
      },
      "age": {
        "ui:location": {
          "rowSpan": 1,
          "colSpan": 1,
          "col": 2
        }
      }
    }
  },
  "arrayarray": {
    "ui:location": {
      "row": 12,
      "col": 1,
      "rowSpan": 4,
      "colSpan": 3
    },
    "items": {
      "ui:location": {
        "col": 1,
        "rowSpan": 4,
        "colSpan": 3
      },
      "items": {
        "ui:location": {
          "col": 1,
          "rowSpan": 1,
          "colSpan": 3
        }
      }
    }
  },
  "datasource": {
    "ui:location": {
      "row": 16,
      "col": 1
    }
  },
  "datatarget": {
    "ui:location": {
      "row": 16,
      "col": 2
    }
  },
  "item1": {
    "ui:location": {
      "row": 17,
      "col": 1
    }
  },
  "item2": {
    "ui:location": {
      "row": 17,
      "col": 2
    }
  },
  "sum": {
    "ui:location": {
      "row": 17,
      "col": 3
    }
  }
};
const TestFormData = {};