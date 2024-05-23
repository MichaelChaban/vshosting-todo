import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VshostingPagesComponent } from './vshosting-pages.component';

describe('VshostingPagesComponent', () => {
  let component: VshostingPagesComponent;
  let fixture: ComponentFixture<VshostingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VshostingPagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VshostingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
