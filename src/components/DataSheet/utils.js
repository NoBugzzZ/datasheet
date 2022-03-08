import fields from "./components/fields";
import widgets from "./components/widgets";
import functions from "./functions"

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
  boolean: {
    input: 'BooleanInputWidget'
  },
  array: {
    datasheet: 'ArrayDataSheetWidget'
  }
}

export function getDefaultRegister() {
  return {
    fields,
    widgets,
    functions,
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

const START_ROW_INDEX = 1
const START_COL_INDEX = 1

export const CELL_OPTIONS = {
  width: 100,
}

const ROW_BAR_CELL_OPTIONS = {
  readOnly: true,
}

const COL_BAR_CELL_OPTIONS = {
  width: 30,
  readOnly: true,
}

const cells = [
  { location: { row: 1, col: 1, rowSpan: 1, colSpan: 1 }, value: null, label: null, component: null },
  { location: { row: 2, col: 1, rowSpan: 1, colSpan: 1 }, value: null, label: null, component: null },
]



const M = [
  [{ type: 'source', rowSpan: 1, colSpan: 2, cellInfo: { rowSpan: 1, colSpan: 2, value: null, label: null, component: null } }, { type: 'target', row: 0, col: 0 }]
]

export function captureMatrix(matrix, {
  readOnly,
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
  component
}) {
  const matrixMaxRowIndex = matrix.length - 1
  const matrixMaxColIndex = matrixMaxRowIndex > -1 ?
    matrix[matrixMaxRowIndex].length - 1 : -1
  const rowIndex = row - 1
  const colIndex = col - 1
  const lessRowIndex = rowIndex + rowSpan - 1 < matrixMaxRowIndex ?
    rowIndex + rowSpan - 1 : matrixMaxRowIndex
  const lessColIndex = colIndex + colSpan - 1 < matrixMaxColIndex ?
    colIndex + colSpan - 1 : matrixMaxColIndex
  let hasConflict = false
  //检查新的cell在矩阵中是否有范围冲突
  if (matrixMaxRowIndex >= rowIndex && matrixMaxColIndex >= colIndex) {
    for (let i = rowIndex; i <= lessRowIndex; i++) {
      for (let j = colIndex; j <= lessColIndex; j++) {
        const { type } = matrix[i][j]
        if (type === 'source' || type === 'target') {
          hasConflict = true
          break
        }
      }
      if (hasConflict) break
    }
  }
  const moreRowIndex = rowIndex + rowSpan - 1 > matrixMaxRowIndex ?
    rowIndex + rowSpan - 1 : matrixMaxRowIndex
  const moreColIndex = colIndex + colSpan - 1 > matrixMaxColIndex ?
    colIndex + colSpan - 1 : matrixMaxColIndex
  let newMatrix = _.cloneDeep(matrix)
  //若无冲突，则可以将cell添加到矩阵
  if (!hasConflict) {
    for (let i = matrixMaxRowIndex + 1; i <= moreRowIndex; i++) {
      newMatrix.push([])
    }
    for (let i = 0; i <= moreRowIndex; i++) {
      const currentColIndex = newMatrix[i].length - 1
      for (let j = currentColIndex + 1; j <= moreColIndex; j++) {
        newMatrix[i].push({ type: 'empty' })
      }
    }

    if (newMatrix.length - 1 !== moreRowIndex) {
      console.log(`newMatrix.length=${newMatrix.length},moreRowIndex=${moreRowIndex}`)
    }
    for (let i = 0; i <= newMatrix.length - 1; i++) {
      if (newMatrix[i].length - 1 !== moreColIndex) {
        console.log(`newMatrix[i].length=${newMatrix[i].length},moreColIndex=${moreColIndex}`)
      }
    }

    for (let i = rowIndex; i <= rowIndex + rowSpan - 1; i++) {
      for (let j = colIndex; j <= colIndex + colSpan - 1; j++) {
        if (i === rowIndex && j === colIndex) {
          newMatrix[i][j] = {
            type: 'source',
            rowSpan,
            colSpan,
            cellInfo: {
              readOnly: readOnly ? true : false,
              rowSpan,
              colSpan,
              value,
              label,
              component
            }
          }
        } else {
          newMatrix[i][j] = { type: 'target', row: rowIndex, col: colIndex }
        }
      }
    }
  }
  return newMatrix
}

function addCellToGrid(grid, rowIndex, colIndex, cell) {
  let newGrid = _.cloneDeep(grid)
  const gridMaxRowIndex = grid.length - 1
  for (let i = gridMaxRowIndex + 1; i <= rowIndex; i++) {
    newGrid.push([])
  }
  const gridColIndex = newGrid[rowIndex].length - 1
  for (let i = gridColIndex + 1; i <= colIndex; i++) {
    newGrid[rowIndex][i] = { ...CELL_OPTIONS }
  }
  newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], ...cell }
  return newGrid
}

export function matrixToGrid(matrix) {
  let grid = []
  const matrixMaxRowIndex = matrix.length - 1
  const matrixMaxColIndex = matrixMaxRowIndex > -1 ?
    matrix[matrixMaxRowIndex].length - 1 : -1
  if (matrixMaxRowIndex >= 0 && matrixMaxColIndex >= 0) {
    for (let i = 0; i <= matrixMaxRowIndex; i++) {
      let targetCount = 0
      for (let j = 0; j <= matrixMaxColIndex; j++) {
        const { type } = matrix[i][j]
        if (type === 'source') {
          const { cellInfo } = matrix[i][j]
          grid = addCellToGrid(grid, i, j - targetCount, cellInfo)
        } else if (type === 'target') {
          targetCount++
        } else if (type === 'empty') {
          grid = addCellToGrid(grid, i, j - targetCount, {})
        } else {
          console.log(`matrix[${i}][${j}].type===${type}`)
        }
      }
    }
  }
  return grid
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

  for (let i = 0; i < START_ROW_INDEX; i++) {
    for (let j = START_COL_INDEX; j < grid[i].length; j++) {
      grid[i][j] = { ...grid[i][j], ...ROW_BAR_CELL_OPTIONS }
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < START_COL_INDEX; j++) {
      grid[i][j] = { ...grid[i][j], ...COL_BAR_CELL_OPTIONS }
    }
  }
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

export function getDefaultFormState(schema) {
  const defaults = computeDefaults(schema)
  return defaults
}

export function computeDefaults(schema) {
  switch (getSchemaType(schema)) {
    case "object":
      return {}
    case "array":
      return []
    default:
      return ""
  }
}

export function parsePath(path, rootFormData) {
  return rootFormData[path]
}

export function getFormData(schema, rootSchema, rootFormData, register) {
  const { dependencies, function: functionName } = schema;
  let dependencyValues = []
  dependencies.forEach((dependency) => {
    dependencyValues.push(parsePath(dependency, rootFormData))
  })
  const {functions}=register
  if(functions.hasOwnProperty(functionName)){
    const func=functions[functionName]
    return func(...dependencyValues)
  }else{
    return null
  }
}