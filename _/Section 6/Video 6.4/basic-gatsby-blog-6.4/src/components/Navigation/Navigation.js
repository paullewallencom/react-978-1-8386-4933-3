import React from "react"
import { Link } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

export default (props) => (
  <div>
    <AppBar>
      <Toolbar>
        <Typography variant="h2">{props.siteTitle}</Typography>
        <ButtonGroup style={{marginLeft: 25}}>
          <Button style={{color: "#fff"}} component={Link} to="/">Home</Button>
          <Button style={{color: "#fff"}} component={Link} to="/about">About</Button>
          <Button style={{color: "#fff"}} component={Link} to="/images">Images</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  </div>
)
