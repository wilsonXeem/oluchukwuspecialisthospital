import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: ':slug', component: BlogPostComponent },
];

@NgModule({
  declarations: [BlogListComponent, BlogPostComponent],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes)]
})
export class BlogModule {}
