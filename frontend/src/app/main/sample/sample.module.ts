import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

 
import { UsuariosComponent } from './usuarios.component';

const routes = [

  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: { animation: 'Usuarios' }
  }
];

@NgModule({
  declarations: [ UsuariosComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [ UsuariosComponent]
})
export class SampleModule {}
