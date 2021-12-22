export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = url => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

export const event = ({ action, category, label, value }) =>
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
