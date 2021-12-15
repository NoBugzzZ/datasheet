import fields from "./components/fields";
import widgets from "./components/widgets";

const widgetMap = {
  string: {
    input: 'StringInputWidget'
  },
  number: {
    input: 'NumberInputWidget'
  },
  integer: {
    input: 'NumberInputWidget'
  },
  boolean:{
    input: 'BooleanInputWidget'
  },
  array:{
    datasheet:'ArrayDataSheetWidget'
  }
}

export function getDefaultRegister() {
  return {
    fields,
    widgets
  }
}

export function getSchemaType(schema) {
  let { type } = schema
  return type
}

export function orderProperties(properties) {
  return properties
}

export function getWidget(schema, widget, registerWidgets = {}) {
  const type = getSchemaType(schema)
  if (widgetMap[type].hasOwnProperty(widget)) {
    return (registerWidgets[widgetMap[type][widget]])
  }
}

export function getLocation(uiSchema) {
  if (uiSchema.hasOwnProperty('ui:location')) {
    var { row, col, rowSpan, colSpan } = uiSchema['ui:location']
    if (row && col) {
      rowSpan = rowSpan || 1
      colSpan = colSpan || 1
      return {
        row,
        col,
        rowSpan,
        colSpan,
      }
    }
  }
  return null
}

const START_ROW_INDEX = 0
const START_COL_INDEX = 0

export const CELL_OPTIONS = {
  width: 100
}

export function addCell(grid, {
  context: {
    location: {
      row,
      col,
      rowSpan,
      colSpan
    },
    value,
    label,
  },
  ...cellInfo
}) {
  const currentMaxRowIndex = grid.length - 1
  const rowIndex = row + (START_ROW_INDEX - 1)
  const colIndex = col + (START_COL_INDEX - 1)
  for (var i = currentMaxRowIndex; i < rowIndex; i++) {
    grid.push([{ ...CELL_OPTIONS }])
  }
  const currentRowIndexMaxColIndex = grid[rowIndex].length - 1
  for (var i = currentRowIndexMaxColIndex; i < colIndex; i++) {
    grid[rowIndex].push({ ...CELL_OPTIONS })
  }
  grid[rowIndex][colIndex] = { ...CELL_OPTIONS, ...cellInfo, rowSpan, colSpan, value, label }
  completeGrid(grid)
}

export function completeGrid(grid) {
  let rowSize = 0
  for (let i = 1; i <= grid.length; i++) {
    for (let j = 1; j <= grid[i - 1].length; j++) {
      let { rowSpan, colSpan } = grid[i - 1][j - 1]
      rowSpan = rowSpan || 1
      colSpan = colSpan || 1
      let currentMaxRow = i + rowSpan - 1
      if (rowSize < currentMaxRow) rowSize = currentMaxRow
    }
  }

  let cellNum = []
  for (let i = 1; i <= rowSize; i++) {
    cellNum.push(0)
  }
  for (let i = 1; i <= grid.length; i++) {
    for (let j = 1; j <= grid[i - 1].length; j++) {
      let { rowSpan, colSpan } = grid[i - 1][j - 1]
      rowSpan = rowSpan || 1
      colSpan = colSpan || 1
      for (let t = 1; t <= rowSpan; t++) {
        cellNum[i + t - 2] += colSpan
      }
    }
  }

  var max = 0
  for (var i = 1; i <= rowSize; i++) {
    if (cellNum[i - 1] > max) max = cellNum[i - 1]
  }

  for (var i = grid.length + 1; i <= rowSize; i++) {
    if (max > cellNum[i - 1]) {
      grid.push([{ ...CELL_OPTIONS }])
      cellNum[i - 1]++
    }
  }
  for (var i = 1; i <= rowSize; i++) {
    for (var j = cellNum[i - 1] + 1; j <= max; j++) {
      grid[i - 1].push({ ...CELL_OPTIONS })
    }
  }

}