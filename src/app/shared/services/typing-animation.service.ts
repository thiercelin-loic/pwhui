import { Injectable, OnDestroy } from '@angular/core';
import { ANIMATION_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TypingAnimationService implements OnDestroy {
  private textIndex = 0;
  private charIndex = 0;
  private intervalId: number | undefined;

  startAnimation(
    texts: string[],
    onUpdate: (text: string) => void,
    onComplete?: () => void
  ): void {
    this.stopAnimation();
    this.textIndex = 0;
    this.charIndex = 0;
    this.write(texts, onUpdate, onComplete);
  }

  stopAnimation(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  private write(
    texts: string[],
    onUpdate: (text: string) => void,
    onComplete?: () => void
  ): void {
    let currentText = '';
    
    this.intervalId = setInterval(() => {
      this.type(texts, currentText, (newText) => {
        currentText = newText;
        onUpdate(currentText);
      }, () => {
        this.erase(texts, currentText, (newText) => {
          currentText = newText;
          onUpdate(currentText);
        }, () => {
          this.textIndex = (this.textIndex + 1) % texts.length;
          this.charIndex = 0;
          this.write(texts, onUpdate, onComplete);
        });
      });
    }, ANIMATION_CONSTANTS.TYPING_SPEED);
  }

  private type(
    texts: string[],
    currentText: string,
    onUpdate: (text: string) => void,
    onComplete: () => void
  ): void {
    const targetText = texts[this.textIndex];

    if (this.charIndex < targetText.length) {
      const newText = currentText + targetText.charAt(this.charIndex);
      this.charIndex++;
      onUpdate(newText);
    } else {
      this.stopAnimation();
      setTimeout(() => onComplete(), ANIMATION_CONSTANTS.DELAY_BETWEEN_TEXTS);
    }
  }

  private erase(
    texts: string[],
    currentText: string,
    onUpdate: (text: string) => void,
    onComplete: () => void
  ): void {
    this.intervalId = setInterval(() => {
      if (currentText.length > 0) {
        const newText = currentText.slice(0, -1);
        onUpdate(newText);
        currentText = newText;
      } else {
        this.stopAnimation();
        onComplete();
      }
    }, ANIMATION_CONSTANTS.ERASING_SPEED);
  }
}
