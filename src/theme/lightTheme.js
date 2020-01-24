const lightTheme = {
  "color-primary": "#2970ff",
  "color-primary-dark": "#091440",
  "color-primary-light": "#2ed8a3",
  "color-blue-light": "#70cbff",
  "color-blue-lighter": "#d4f0fd",
  "color-blue-alt": "#1A59F7",
  "color-green": "#41bf53",
  "color-green-light": "#c4ecca",
  "color-orange": "#ed6d47",
  "color-orange-alt": "#f8a085",
  "color-orange-light": "#feb8a5",
  "color-orange-lighter": "#fff5f3",
  "color-gold": "#cfa03f",
  "color-yellow": "#ffc84e",
  "color-yellow-light": "#ffe4a7",
  "color-gray-blueish": "#596D81",
  "color-gray-dark": "#3d5873",
  "color-gray": "#8997a5",
  "color-gray-light": "#c4cbd2",
  "color-gray-lighter": "#e6eaed",
  "color-gray-lightest": "#f3f5f6",
  "color-gray-lightest2": "#f9fafa",
  "color-white": "#ffffff",

  "color-shadow-light": "rgba(0, 0, 0, 0.2)",

  "text-color": "var(--color-primary-dark)",
  "text-color-light": "var(--color-gray)",
  "font-size-xxxlarge": "2.8rem",
  "font-size-xxlarge": "2.4rem",
  "font-size-xlarge": "2.0rem",
  "font-size-large": "1.8rem",
  "font-size-normal": "1.6rem",
  "font-size-small": "1.3rem",

  "font-weight-extra-light": "200",
  "font-weight-light": "300",
  "font-weight-regular": "400",
  "font-weight-semi-bold": "600",
  "font-weight-bold": "700",
  "font-weight-extra-bold": "900",

  "spacing-1": "1.7rem",
  "spacing-2": "2rem",
  "spacing-3": "3.1rem",
  "spacing-4": "3.6rem",

  "z-index-0": "0",
  "z-index-1": "1",
  "z-index-2": "2",
  "z-index-3": "3",
  "z-index-4": "4",
  "z-index-5": "5",
  "z-index-small": "-9999",
  "z-index-big": "9999",

  /** COMPONENTS */
  /** Layout */
  "layout-column-gap-sm": "1.9rem",
  "layout-column-gap-md": "2.4rem",
  "layout-column-gap-lg": "2.6rem",

  /** 561px - 768px */
  "min-column-size-sm": "1rem",
  "max-column-size-sm": "4.2rem",

  /** 769px - 1000px */
  "min-column-size-md": "1rem",
  "max-column-size-md": "6rem",

  /** > 1000px */
  "min-column-size-lg": "5rem",
  "max-column-size-lg": "8rem",

  /** COLORS */
  "header-color": "var(--color-gray-lightest2)",
  "container-color": "var(--color-gray-lightest)",
  "header-border-color": "var(--color-gray-light)",
  "topbanner-color": "var(--color-white)",
  "main-color": "var(--color-white)",
  "text-heading-color": "var(--color-gray-dark)",
  "text-heading2-color": "var(--color-primary-dark)",
  "text-input-color": "var(--color-gray)",
  "text-secondary-color": "var(--color-gray)",
  "input-border-color": "var(--color-gray-lighter)",
  "active-nav-border-color": "var(--color-yellow)",
  "separator-color": "var(--color-gray-lighter)",
  "subtitle-color": "var(--color-gray)",
  "success-icon-background-color": "var(--color-gray)",
  "success-icon-checkmark-color": "var(--color-primary-dark)",

  /** GRID */
  "grid-center-padding": `minmax(
    calc(6rem - var(--layout-column-gap-lg)),
    1fr
  )`,

  "layout-grid-columns": `[full-start] var(--grid-center-padding) [center-start]
    repeat(
      12,
      [col-start] minmax(var(--min-column-size-lg), var(--max-column-size-lg))
      [col-end]
    )
    [center-end] var(--grid-center-padding) [full-end]`,

  "layout-grid-rows": "6rem 14rem 3rem minmax(30rem, max-content)",

  /** Card */
  "card-background": "var(--color-white)",
  "dimmed-card-background": "var(--color-gray-lighter)",

  /** Message */
  "error-message-background": "var(--color-orange-lighter)",
  "error-message-color": "var(--color-orange)",
  "warning-message-background": "var(--color-yellow-light)",
  "warning-message-color": "var(--color-gold)",
  "info-message-background": "var(--color-gray-lighter)",
  "info-message-color": "var(--color-gray-light)",
  "success-message-background": "var(--color-green-light)",
  "success-message-color": "var(--color-green)",
  "blocked-message-background": "var(--color-orange-lighter)",
  "blocked-message-color": "var(--color-orange-alt)",

  /** Tabs */
  "tab-active-underline-color": "var(--color-yellow)",
  "tab-active-font-color": "var(--color-primary-dark)",
  "tab-count-background": "var(--color-gray-lighter)",
  "tab-active-color": "var(--color-primary-light)",
  "tab-text-color": "#3d5873",
  "tab-text-active-color": "#091440",

  /** Comments */
  "comment-like-color": "var(--color-gray)",
  "comment-like-color-active": "var(--color-primary-dark)",

  /** Button */
  "btn-background-color": "var(--color-primary)",
  "btn-disabled-background-color": "var(--color-gray-lighter)",
  "btn-disabled-text-color": "var(--color-gray)",

  /** Icon */
  "icon-color": "#c4cbd2",
  "icon-background-color": "#091440",
  "icon-hover-color": "var(--color-gray)",

  /** Table */
  "table-header-background": "var(--color-gray-lightest)",
  "table-cell-border-color": "var(--color-gray-lightest)",
  "table-page-arrow-background": "var(--color-white)",
  "table-page-arrow-text-color": "var(--color-text)",
  "table-active-page-arrow-text-color": "var(--color-primary)",
  "table-active-page-arrow-background": "var(--color-gray-lighter)",

  /** Toggle */
  "toggle-bar-color": "var(--color-gray-light)",

  /** Dropdown */
  "dropdown-item-hover-color": "var(--color-primary-dark)",
  "dropdown-arrow-color": "var(--color-gray)",

  /** Copyable Text */
  "copyable-text-background-color": "var(--color-blue-lighter)",

  /** Modal */
  "modal-close-color": "var(--text-color-light)",

  /** Tooltip */
  "tooltip-background-color": "var(--color-white)",

  /** Checkbox */
  "checkbox-stroke-color": "var(--color-gray)",

  /** Select */
  "select-border-color": "var(--color-gray-lighter)",
  "select-anchor-color": "var(--color-gray)"
};

export default lightTheme;
