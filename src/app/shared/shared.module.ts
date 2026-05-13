import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner/loading-spinner.component';
import { ToastComponent } from './components/toast/toast/toast.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { HasRoleDirective } from './directives/has-role.directive';
import { AccessibilityDirective } from './directives/accessibility.directive';
import { SuccessMessageComponent } from './components/success-message/success-message/success-message.component';
import { SessionWarningComponent } from './components/session-warning/session-warning/session-warning.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout/public-layout.component';
import { PublicNavbarComponent } from './components/public-navbar/public-navbar/public-navbar.component';
import { PublicFooterComponent } from './components/public-footer/public-footer/public-footer.component';
import { HmsLayoutComponent } from './components/hms-layout/hms-layout.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader/skeleton-loader.component';
import { ChartWidgetComponent } from './components/chart-widget/chart-widget/chart-widget.component';
import { HelpSystemComponent } from './components/help-system/help-system/help-system.component';
import { KeyboardShortcutsModalComponent } from './components/keyboard-shortcuts-modal/keyboard-shortcuts-modal/keyboard-shortcuts-modal.component';
import { KeyboardNavigationDirective } from './directives/keyboard-navigation.directive';
import { TouchGesturesDirective } from './directives/touch-gestures.directive';
import { ToastContainerComponent } from './components/toast-container/toast-container/toast-container.component';
import { IconComponent } from './components/icon/icon.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ModalComponent,
    ConfirmDialogComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    ReceiptComponent,
    DateFormatPipe,
    HasRoleDirective,
    AccessibilityDirective,
    SuccessMessageComponent,
    SessionWarningComponent,
    PublicLayoutComponent,
    PublicNavbarComponent,
    PublicFooterComponent,
    HmsLayoutComponent,
    SkeletonLoaderComponent,
    ChartWidgetComponent,
    HelpSystemComponent,
    KeyboardShortcutsModalComponent,
    KeyboardNavigationDirective,
    TouchGesturesDirective,
    ToastContainerComponent,
    IconComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ModalComponent,
    ConfirmDialogComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    ReceiptComponent,
    DateFormatPipe,
    HasRoleDirective,
    AccessibilityDirective,
    SuccessMessageComponent,
    SessionWarningComponent,
    PublicLayoutComponent,
    PublicNavbarComponent,
    PublicFooterComponent,
    HmsLayoutComponent,
    SkeletonLoaderComponent,
    ChartWidgetComponent,
    HelpSystemComponent,
    KeyboardShortcutsModalComponent,
    KeyboardNavigationDirective,
    TouchGesturesDirective,
    ToastContainerComponent,
    IconComponent,
    ImageUploadComponent
  ]
})
export class SharedModule { }
