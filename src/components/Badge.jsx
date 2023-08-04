import React from 'react'

function Badge({children, bg}) {
    const successBg = '#4caf50'
    const warningBg = '#ff9800'
    const errorBg = '#e57373'
    return (
        <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                background: `${bg==='warning'? warningBg: bg==='success'? successBg: bg==='error'? errorBg :successBg}`,
                padding: '2px 8px',
                borderRadius: '16px'
            }}
        >
            {children}
        </span>
    )
}

export default Badge