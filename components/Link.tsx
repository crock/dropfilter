import React, { ReactNode } from 'react';
import NextLink, { LinkProps } from 'next/link';
import classNames from 'classnames'

interface ILink extends LinkProps {
    to: string,
    activeClassName?: string,
    className?: string,
    children: ReactNode
}

const Link = ({ to, activeClassName, children, className, ...props }: Partial<ILink>) => {

    return (
        <NextLink href={to} {...props}>
            <a className={classNames(className, {
                [activeClassName]: typeof window !== 'undefined' && window.location.pathname == to,
            })}>
                {children}
            </a>
        </NextLink>
    )
}

export default Link