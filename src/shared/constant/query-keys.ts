export const queryKeyBase = {
  arena: 'arena',
}

export const queryKeys = {
  arena: {
    base: queryKeyBase.arena,
    list: `${queryKeyBase.arena}-list`,
    enemy: {
      base: `${queryKeyBase.arena}/enemy`,
      list: `${queryKeyBase.arena}/enemy-list`,
    },
  },
}
