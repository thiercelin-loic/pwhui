import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Chat } from './chat';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';

describe('Chat', () => {
  let component: Chat;
  let fixture: ComponentFixture<Chat>;

  const authServiceMock = {
    getMe: () => of({}),
    current: { id: '123', first_name: 'Test' }
  };

  const toastServiceMock = {
    show: jasmine.createSpy('show'),
    history$: of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chat],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
