// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'Dev',
  name: 'admin',
  api: {
    name: 'Development',
    baseUrl: 'https://tatjana.stgdev.net/api/'
    // baseUrl: 'http://192.168.1.100:8000/api/'
  },
  pusher: {
    key: '5da6ff879cc284d42fc0',
    cluster: 'ap2',
  },
  google: {
    website_key: 'AIzaSyAAyKSGB1MhdSL2HiM7kFg46oZKCMvagH4',
    android_key: 'AIzaSyA-WRUQKmRpbmPVd6F-c0VdIqVtMMNk_TQ',
    ios_key: 'AIzaSyB8PxfvqlOPDSCc8C7zs66c-ECfVkpBojE',
    mapStyleId: '69ec83d2b0233613'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
