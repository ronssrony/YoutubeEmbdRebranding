<script setup >
onMounted(async ()=>{
  await nextTick()
  const vdsbutton = document.querySelector('media-poster');
  vdsbutton.click();
  console.log('vdsbutton', vdsbutton);
})
const {source, poster} = defineProps(['source','poster']);
</script>

<template>
  <client-only>
    <media-player
        title="GAME OF THRONES"
        :src=source
        :poster="poster"
    >
      <media-provider>
        <media-poster class="vds-poster"></media-poster>
      </media-provider>
      <media-video-layout>
        <div class="ota-lms-branding">GOT</div>
      </media-video-layout>
    </media-player>
  </client-only>
</template>

<style scoped>
.vds-video-layout {
  height: 100%;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  z-index: 2;

  /* Brand Colors */
  --media-brand: #f97316;
  --media-brand-secondary: #3b82f6;
  --media-brand-accent: #ea580c;
  --media-controls-color: #f8fafc;
  --media-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Focus States */
  --media-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.5);

  /* Enhanced Loading Animation */
  --media-buffering-size: 66px;
  --media-buffering-track-color: rgb(255, 112, 0);
  --media-buffering-track-fill-color: #f97316;
  --media-buffering-track-fill-offset: 15;
  --media-buffering-track-fill-opacity: 0.8;
  --media-buffering-track-fill-width: 8;
  --media-buffering-track-opacity: 0.8;
  --media-buffering-track-width: 8;
  --media-buffering-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Modern Button Design */
  --media-button-border-radius: 12px;
  --media-button-color: #f8fafc;
  --media-button-hover-bg: rgba(249, 115, 22, 0.15);
  --media-button-hover-transform: scale(1.05);
  --media-button-hover-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --media-button-icon-size: 85%;
  --media-button-padding: 8px;
  --media-button-size: 44px;
  --media-button-touch-hover-bg: rgba(249, 115, 22, 0.2);
  --media-button-touch-hover-border-radius: 50%;
  --media-sm-fullscreen-button-size: 48px;
  --media-fullscreen-button-size: 48px;

  /* Enhanced Tooltips */
  --media-tooltip-bg-color: rgba(15, 23, 42, 0.95);
  --media-tooltip-border-radius: 8px;
  --media-tooltip-border: 1px solid rgba(249, 115, 22, 0.2);
  --media-tooltip-color: #f8fafc;
  --media-tooltip-font-size: 13px;
  --media-tooltip-font-weight: 500;
  --media-tooltip-padding: 8px 12px;
  --media-tooltip-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);

  /* Live Indicator with Brand Colors */
  --media-live-button-bg: rgba(148, 163, 184, 0.8);
  --media-live-button-border-radius: 6px;
  --media-live-button-color: #0f172a;
  --media-live-button-edge-bg: #f97316;
  --media-live-button-edge-color: #f8fafc;
  --media-live-button-font-size: 11px;
  --media-live-button-font-weight: 600;
  --media-live-button-height: 32px;
  --media-live-button-letter-spacing: 0.5px;
  --media-live-button-padding: 4px 8px;
  --media-live-button-width: auto;
  --media-live-button-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);

  /* Modern Captions */
  --media-captions-padding: 2%;
  --media-cue-backdrop: blur(12px);
  --media-cue-bg: rgba(15, 23, 42, 0.85);
  --media-cue-border-radius: 8px;
  --media-cue-border: 1px solid rgba(249, 115, 22, 0.2);
  --media-cue-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  --media-cue-color: #f8fafc;
  --media-cue-font-size: calc(var(--overlay-height) / 100 * 4);
  --media-cue-line-height: calc(var(--cue-font-size) * 1.4);
  --media-cue-padding-x: calc(var(--cue-font-size) * 0.8);
  --media-cue-padding-y: calc(var(--cue-font-size) * 0.4);

  /* Chapter Title Styling */
  --media-chapter-title-color: rgba(248, 250, 252, 0.7);
  --media-chapter-title-font-size: 14px;
  --media-chapter-title-font-weight: 500;
  --media-chapter-title-separator-color: #f97316;
  --media-chapter-title-separator-gap: 8px;
  --media-chapter-title-separator: '•';

  /* Enhanced Controls */
  --media-controls-padding: 16px;
  --media-controls-in-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --media-controls-out-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --media-controls-bg: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);

  /* Modern Thumbnails */
  --media-thumbnail-bg: #0f172a;
  --media-thumbnail-border: 2px solid #f97316;
  --media-thumbnail-border-radius: 8px;
  --media-thumbnail-aspect-ratio: 16 / 9;
  --media-thumbnail-min-width: 140px;
  --media-thumbnail-min-height: calc(var(--media-thumbnail-min-width) / var(--aspect-ratio));
  --media-thumbnail-max-width: 200px;
  --media-thumbnail-max-height: calc(var(--media-thumbnail-max-width) / var(--aspect-ratio));
  --media-thumbnail-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);

  /* Time Display */
  --media-time-bg: rgba(15, 23, 42, 0.8);
  --media-time-border-radius: 6px;
  --media-time-border: 1px solid rgba(249, 115, 22, 0.2);
  --media-time-color: #f8fafc;
  --media-time-divider-color: #f97316;
  --media-time-divider-gap: 4px;
  --media-time-font-size: 14px;
  --media-time-font-weight: 500;
  --media-time-letter-spacing: 0.025em;
  --media-time-padding: 4px 8px;

  /* Enhanced Sliders */
  --media-slider-width: 100%;
  --media-slider-height: 56px;

  /* Modern Slider Thumb */
  --media-slider-thumb-bg: #f8fafc;
  --media-slider-thumb-border-radius: 50%;
  --media-slider-thumb-border: 2px solid #f97316;
  --media-slider-thumb-size: 18px;
  --media-slider-thumb-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --media-slider-thumb-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);

  /* Slider Steps */
  --media-slider-step-width: 3px;
  --media-slider-step-color: rgba(148, 163, 184, 0.6);

  /* Chapter Hover Effects */
  --media-slider-chapter-hover-transform: scaleY(2.5);
  --media-slider-chapter-hover-transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* Slider Preview */
  --media-slider-preview-bg: rgba(15, 23, 42, 0.95);
  --media-slider-preview-border-radius: 8px;
  --media-slider-preview-border: 1px solid rgba(249, 115, 22, 0.3);

  /* Chapter Title in Slider */
  --media-slider-chapter-title-bg: rgba(15, 23, 42, 0.9);
  --media-slider-chapter-title-color: #f8fafc;
  --media-slider-chapter-title-font-size: 13px;
  --media-slider-chapter-title-gap: 8px;
  --media-slider-chapter-title-padding: 4px 8px;
  --media-slider-chapter-title-border-radius: 4px;

  /* Slider Value Display */
  --media-slider-value-bg: rgba(15, 23, 42, 0.95);
  --media-slider-value-border-radius: 6px;
  --media-slider-value-color: #f8fafc;
  --media-slider-value-gap: 4px;
  --media-slider-value-padding: 6px 12px;
  --media-slider-value-font-weight: 500;
  --media-slider-value-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);

  /* Enhanced Menu Colors */
  --media-menu-color-gray-50: rgba(248, 250, 252, 0.1);
  --media-menu-color-gray-100: rgba(248, 250, 252, 0.15);
  --media-menu-color-gray-200: rgba(15, 23, 42, 0.8);
  --media-menu-color-gray-300: rgba(30, 41, 59, 0.9);

  /* Menu Text */
  --media-menu-text-color: #f8fafc;
  --media-menu-text-secondary-color: rgba(148, 163, 184, 0.8);

  /* Enhanced Menu */
  --media-menu-bg: rgba(15, 23, 42, 0.95);
  --media-menu-border-radius: 12px;
  --media-menu-border: 1px solid rgba(249, 115, 22, 0.2);
  --media-menu-box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  --media-menu-backdrop-filter: blur(16px);
  --media-menu-divider: 1px solid rgba(248, 250, 252, 0.1);
  --media-menu-font-size: 14px;
  --media-menu-font-weight: 500;
  --media-menu-max-height: 320px;
  --media-menu-min-width: 240px;
  --media-menu-padding: 16px;
  --media-menu-top-bar-bg: rgba(249, 115, 22, 0.1);
  --media-menu-arrow-icon-size: 20px;
  --media-menu-icon-rotate-deg: 90deg;

  --media-menu-scrollbar-track-bg: transparent;
  --media-menu-scrollbar-thumb-bg: rgba(249, 115, 22, 0.3);
  --media-menu-scrollbar-thumb-hover-bg: rgba(249, 115, 22, 0.5);

  /* Menu Items */
  --media-menu-item-bg: transparent;
  --media-menu-item-border-radius: 8px;
  --media-menu-item-border: 0;
  --media-menu-item-height: 44px;
  --media-menu-item-hover-bg: rgba(249, 115, 22, 0.1);
  --media-menu-item-active-bg: rgba(249, 115, 22, 0.15);
  --media-menu-item-icon-size: 20px;
  --media-menu-item-icon-spacing: 12px;
  --media-menu-item-padding: 12px;
  --media-menu-item-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* Menu Radio */
  --media-menu-radio-icon-color: #f97316;
  --media-menu-radio-icon-size: 18px;

  /* Menu Checkbox */
  --media-menu-checkbox-width: 44px;
  --media-menu-checkbox-height: 24px;
  --media-menu-checkbox-bg-active: #f97316;
  --media-menu-checkbox-bg: rgba(148, 163, 184, 0.3);
  --media-menu-checkbox-handle-bg: #f8fafc;
  --media-menu-checkbox-handle-border: 1px solid rgba(249, 115, 22, 0.2);
  --media-menu-checkbox-handle-diameter: calc(var(--checkbox-height) - 4px);
  --media-menu-checkbox-border-radius: 12px;
  --media-menu-checkbox-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* Menu Slider */
  --media-menu-slider-height: 36px;
  --media-menu-slider-track-bg: rgba(148, 163, 184, 0.2);
  --media-menu-slider-track-fill-bg: #f97316;
  --media-menu-slider-thumb-bg: #f8fafc;
  --media-menu-slider-thumb-border: 2px solid #f97316;

  /* Menu Hints */
  --media-menu-hint-color: rgba(148, 163, 184, 0.7);
  --media-menu-hint-font-size: 12px;
  --media-menu-hint-font-weight: 400;

  /* Enhanced Chapters Menu */
  --media-chapters-divider: 1px solid rgba(248, 250, 252, 0.1);
  --media-chapters-duration-bg: rgba(249, 115, 22, 0.1);
  --media-chapters-duration-border-radius: 4px;
  --media-chapters-duration-padding: 2px 6px;
  --media-chapters-focus-padding: 8px;
  --media-chapters-item-active-bg: rgba(249, 115, 22, 0.15);
  --media-chapters-item-active-border-left: 3px solid #f97316;
  --media-chapters-min-width: 280px;
  --media-chapters-padding: 8px;
  --media-chapters-progress-bg: #f97316;
  --media-chapters-progress-border-radius: 2px;
  --media-chapters-progress-height: 4px;
  --media-chapters-start-time-border-radius: 4px;
  --media-chapters-start-time-letter-spacing: 0.025em;
  --media-chapters-start-time-padding: 2px 6px;
  --media-chapters-start-time-bg: rgba(59, 130, 246, 0.1);
  --media-chapters-start-time-color: #3b82f6;
  --media-chapters-thumbnail-border: 2px solid rgba(249, 115, 22, 0.3);
  --media-chapters-thumbnail-border-radius: 6px;
  --media-chapters-thumbnail-gap: 16px;
  --media-chapters-thumbnail-max-height: 72px;
  --media-chapters-thumbnail-max-width: 128px;
  --media-chapters-thumbnail-min-height: 60px;
  --media-chapters-thumbnail-min-width: 106px;
  --media-chapters-time-font-size: 12px;
  --media-chapters-time-font-weight: 500;
  --media-chapters-time-gap: 8px;
  --media-chapters-with-thumbnails-min-width: 340px;
}

/* OTA-LMS Branding Overlay */
.ota-lms-branding {
  position: absolute;
  top: 16px;
  left: 16px;
  color: #f8fafc;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 0.5px;
  z-index: 100;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Enhanced hover states */
.vds-video-layout:hover .ota-lms-branding {
  background: rgba(249, 115, 22, 1);
  transform: scale(1.05);
  transition: all 0.2s ease;
}
</style>