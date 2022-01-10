import React from 'react'
import {Card,CardContent,Typography} from '@mui/material'

function Infobox({title,cases,total}) {
    return (
        <div>
            
        <Card className="infobox">
            <CardContent>
                <Typography className='infobox_title' color="textSecondary">
                    {title}
                </Typography>
                <h2 className='infobox_cases'>
                    {cases}
                </h2>
                <Typography className='infobox_total'color="textSecondary">
                    {total}Total
                </Typography>
            </CardContent>
            
        </Card>
        </div>
    )
}

export default Infobox;