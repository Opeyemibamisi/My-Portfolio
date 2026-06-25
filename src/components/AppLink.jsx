

export default function AppLink({ href, navigate, children, className, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || !href.startsWith('/')) return
    event.preventDefault()
    navigate(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
