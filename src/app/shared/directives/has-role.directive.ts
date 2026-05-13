import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from "@angular/core";
import { AuthService } from "../../core/services/auth.service";

@Directive({
  selector: "[appHasRole]",
})
export class HasRoleDirective implements OnInit {
  private roles: string[] = [];

  @Input() set appHasRole(roles: string | string[]) {
    this.roles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(() => {
      this.updateView();
    });
  }

  private updateView(): void {
    const currentUser = this.authService.getCurrentUser();
    const hasRole = currentUser && this.roles.includes(currentUser.role);

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
