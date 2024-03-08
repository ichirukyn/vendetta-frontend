const pathBase = {
  arena: `/arena`,
  technique: `/technique`,
  enemy: '/enemy',
  hero: '/hero',
  item: '/item',
  map: '/map',
  event: '/event',
  branch: '/branch',
}

export const pathRoutes = {
  home: '/',
  arena: {
    base: `${ pathBase.arena }`,
    floor: `${ pathBase.arena }/floor`,
    floor_create: `${ pathBase.arena }/floor/create`,
    floor_edit: `${ pathBase.arena }/floor/edit`,
    edit: `${ pathBase.arena }/edit`,
    create: `${ pathBase.arena }/create`,
    application: `${ pathBase.arena }/application`,
  },
  technique: {
    base: `${ pathBase.technique }`,
    edit: `${ pathBase.technique }/edit`,
    create: `${ pathBase.technique }/create`,
    application: `${ pathBase.technique }/application`,
  },
  enemy: {
    base: `${ pathBase.enemy }`,
    edit: `${ pathBase.enemy }/edit`,
    create: `${ pathBase.enemy }/create`,
    application: `${ pathBase.enemy }/application`,
    team: `${ pathBase.enemy }/team`,
    team_enemy_create: `${ pathBase.enemy }/team/enemy/create`,
    team_create: `${ pathBase.enemy }/team/create`,
  },
  hero: {
    base: `${ pathBase.hero }`,
    edit: `${ pathBase.hero }/edit`,
    create: `${ pathBase.hero }/create`,
    application: `${ pathBase.hero }/application`,
  },
  item: {
    base: `${ pathBase.item }`,
    edit: `${ pathBase.item }/edit`,
    create: `${ pathBase.item }/create`,
    application: `${ pathBase.item }/application`,
  },
  map: {
    base: `${ pathBase.map }`,
    edit: `${ pathBase.map }/edit`,
    create: `${ pathBase.map }/create`,
    application: `${ pathBase.map }/application`,
  },
  event: {
    base: `${ pathBase.event }`,
    edit: `${ pathBase.event }/edit`,
    create: `${ pathBase.event }/create`,
    application: `${ pathBase.event }/application`,
  },
  branch: {
    base: `${ pathBase.branch }`,
    view: `${ pathBase.branch }/view`,
    create: `${ pathBase.branch }/create`,
  },
}