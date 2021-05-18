import React from 'react'

const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }

  return <div className={`Notification ${notification.type === 'success' ? 'success' : 'error'}`}>
    {notification.message}
  </div>
}
export default Notification