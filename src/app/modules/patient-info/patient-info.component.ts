import { Component } from '@angular/core';
import { HOSPITAL } from '../../core/constants/hospital.constants';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent {
  hospital = HOSPITAL;
  openFaq: number | null = null;

  faqs = [
    { q: 'Do I need a referral to see a specialist?', a: 'You can contact us directly to book a consultation. A referral from your GP is helpful but not always required.' },
    { q: 'How long does an endoscopy procedure take?', a: 'Upper GI Endoscopy typically takes 15–30 minutes. Colonoscopy takes 30–60 minutes. You should allow 2–3 hours for the full visit including preparation and recovery.' },
    { q: 'Will I be sedated during the procedure?', a: 'Sedation is available and commonly used for endoscopy procedures. Your doctor will discuss the options with you before the procedure.' },
    { q: 'When will I get my results?', a: 'Preliminary findings are usually discussed with you immediately after the procedure. Biopsy results, if taken, typically take a few days.' },
    { q: 'How soon can I eat after an endoscopy?', a: 'For Upper GI Endoscopy, you can usually eat and drink within an hour. For Colonoscopy, you can resume a normal diet the same day unless advised otherwise.' },
    { q: 'Is laparoscopic surgery safe?', a: 'Laparoscopic surgery is a well-established, safe technique. It carries fewer risks than open surgery and results in faster recovery for most patients.' }
  ];

  toggleFaq(index: number): void {
    this.openFaq = this.openFaq === index ? null : index;
  }
}
