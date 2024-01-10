const pathBase = {
  technique: `/technique`,
  enemy: '/enemy',
  hero: '/hero',
  item: '/item',
  map: '/map',
}

export const pathRoutes = {
  home: '/',
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
}