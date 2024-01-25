function areObjectsChange(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  const keys1 = Object.keys(obj1)

  // Kiểm tra từng khóa và giá trị
  return keys1.every((key) => obj1[key] === obj2[key])
}

function mapStringToEnum<T extends Record<string, string>>(enumObject: T, value: string): T[keyof T] | undefined {
  return Object.values(enumObject).includes(value as T[keyof T]) ? (value as T[keyof T]) : undefined
}

function updateObjectInArray(array: any[], id: any, updatedValues: any) {
  const index = array.findIndex((obj) => obj.id === id)

  if (!~index) {
    // console.log('Not found element in array')
  } else {
    array[index] = Object.assign({}, array[index], updatedValues)
  }

  return array
}

export { areObjectsChange, mapStringToEnum, updateObjectInArray }
