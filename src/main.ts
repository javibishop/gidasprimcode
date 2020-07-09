import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
/*en donde levanta la app, en un browser el AppModule */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
