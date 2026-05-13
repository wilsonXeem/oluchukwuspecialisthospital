import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface HelpContent {
  route: string;
  title: string;
  description: string;
  steps: string[];
  tips?: string[];
  shortcuts?: { key: string; description: string }[];
}

@Component({
  selector: 'app-help-system',
  templateUrl: './help-system.component.html',
  styleUrls: ['./help-system.component.css']
})
export class HelpSystemComponent implements OnInit, OnDestroy {
  isExpanded = false;
  currentHelp?: HelpContent;
  private routerSubscription?: Subscription;

  private helpContent: HelpContent[] = [
    {
      route: '/dashboard',
      title: 'Dashboard Help',
      description: 'The dashboard provides an overview of key metrics and quick access to important functions.',
      steps: [
        'View key statistics in the stats cards',
        'Check recent activities in the activity feed',
        'Use quick action buttons for common tasks',
        'Monitor real-time notifications'
      ],
      tips: [
        'Click on stat cards to drill down into details',
        'Use the refresh button to update data',
        'Customize your dashboard layout in settings'
      ],
      shortcuts: [
        { key: 'Ctrl+H', description: 'Go to Dashboard' },
        { key: 'Ctrl+R', description: 'Refresh data' }
      ]
    },
    {
      route: '/patient',
      title: 'Patient Management Help',
      description: 'Manage patient records, appointments, and medical information.',
      steps: [
        'Search for patients using the search bar',
        'Click "Add Patient" to register new patients',
        'Click on a patient row to view details',
        'Use filters to narrow down patient lists'
      ],
      tips: [
        'Use advanced search for better results',
        'Export patient data using the export button',
        'Bulk operations are available for multiple patients'
      ],
      shortcuts: [
        { key: 'Ctrl+P', description: 'Go to Patients' },
        { key: 'Ctrl+N', description: 'Add new patient' }
      ]
    },
    {
      route: '/doctor',
      title: 'Doctor Panel Help',
      description: 'Access doctor-specific tools for consultations, prescriptions, and patient care.',
      steps: [
        'View your appointment schedule',
        'Start consultations from the queue',
        'Create prescriptions and lab requests',
        'Review patient medical history'
      ],
      tips: [
        'Use templates for faster documentation',
        'Check drug interactions before prescribing',
        'Voice-to-text is available for notes'
      ],
      shortcuts: [
        { key: 'Ctrl+D', description: 'Go to Doctor Panel' },
        { key: 'Ctrl+C', description: 'Start consultation' }
      ]
    },
    {
      route: '/lab',
      title: 'Laboratory Help',
      description: 'Manage lab tests, results, and quality control processes.',
      steps: [
        'Process incoming test requests',
        'Enter test results using templates',
        'Review and approve results',
        'Generate lab reports'
      ],
      tips: [
        'Use barcode scanning for sample tracking',
        'Set up result templates for efficiency',
        'Monitor quality control metrics'
      ],
      shortcuts: [
        { key: 'Ctrl+L', description: 'Go to Lab' },
        { key: 'Ctrl+T', description: 'New test result' }
      ]
    },
    {
      route: '/inventory',
      title: 'Inventory Help',
      description: 'Track medical supplies, medications, and equipment.',
      steps: [
        'Monitor stock levels and expiry dates',
        'Create purchase orders for low stock',
        'Record stock movements and adjustments',
        'Generate inventory reports'
      ],
      tips: [
        'Set up automatic reorder alerts',
        'Use batch tracking for medications',
        'Regular stock audits improve accuracy'
      ],
      shortcuts: [
        { key: 'Ctrl+I', description: 'Go to Inventory' },
        { key: 'Ctrl+S', description: 'Stock entry' }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateHelpContent(event.url);
      });

    // Set initial help content
    this.updateHelpContent(this.router.url);

    // Listen for help shortcut
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'F1' || (event.ctrlKey && event.key === '?')) {
      event.preventDefault();
      this.toggleHelp();
    }
  }

  private updateHelpContent(url: string): void {
    const route = url.split('?')[0]; // Remove query params
    this.currentHelp = this.helpContent.find(help => 
      route.startsWith(help.route)
    ) || {
      route: '',
      title: 'General Help',
      description: 'Welcome to the Hospital Management System. Use the navigation menu to access different modules.',
      steps: [
        'Use the sidebar to navigate between modules',
        'Access your profile from the top-right menu',
        'Use keyboard shortcuts for faster navigation',
        'Contact support if you need assistance'
      ],
      shortcuts: [
        { key: 'Ctrl+/', description: 'Show all shortcuts' },
        { key: 'F1', description: 'Toggle help panel' }
      ]
    };
  }

  toggleHelp(): void {
    this.isExpanded = !this.isExpanded;
  }

  showAllShortcuts(): void {
    const event = new CustomEvent('showShortcutsHelp');
    document.dispatchEvent(event);
  }

  contactSupport(): void {
    // This could open a modal, redirect to contact page, or open email client
    window.open('mailto:support@hospital-system.com?subject=Help Request', '_blank');
  }
}