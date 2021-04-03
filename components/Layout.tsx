import React, { ReactNode } from 'react'
import Head from 'next/head'
import { AppBar, Typography, Toolbar, CssBaseline } from '@material-ui/core';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <React.Fragment>
    <CssBaseline />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content="LetterBomb" />
    </Head>
    <AppBar position="relative">
    <Toolbar>
    <Typography variant="h6" color="inherit" noWrap>
            letterbomb
          </Typography>
    </Toolbar>
    </AppBar>    
    {children}
  </React.Fragment>
)

export default Layout