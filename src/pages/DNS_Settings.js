import React from 'react';
import './DNS_Settings.scss';
import SidePanelNav from '../components/SidePanelNav/SidePanelNav';

import { BackButton, Grid, Stack } from '@sqs/rosetta-elements';
import { NavMenu } from '@sqs/rosetta-compositions';


export default function DNS_Settings() {
    const { NavItem, NavText, NavGroup, NavItemAccessory } = NavMenu;
    const [value, onChange] = React.useState('pages');

    return (
        <>
            <Grid.Container
                alignItems="center"
                gridConstraint={12}
                height="sizes.300"
            >
                {/* Left section */}
                <Grid.Item columns={[6, 4]}>
                    <Stack
                        justifyContent="flex-start"
                        alignItems="center"
                        direction="row"
                        space={1}
                    >
                        <BackButton label="Domain Overview" />
                    </Stack>
                </Grid.Item>
            </Grid.Container>
            <NavMenu value={value} onChange={onChange}>
                {/* <NavText variant="title">Settings</NavText> */}
                <NavGroup>
                    <NavItem value="sa" is="a">
                        <NavText variant="subtitle">Overview</NavText>
                    </NavItem>
                    <NavItem value="sa" is="a">
                        <NavText variant="subtitle">DNS</NavText>
                        <NavItemAccessory variant="subtitle">DNS Settings</NavItemAccessory>
                        <NavItemAccessory variant="subtitle">DNS Nameservers</NavItemAccessory>
                    </NavItem>
                    <NavItem value="member" is="div">
                        <NavText variant="subtitle">Permissions</NavText>
                    </NavItem>
                </NavGroup>
            </NavMenu>
        </>
        // <div className="container full-width">
        //     <div className="row">
        //         {/* <SidePanelNav /> */}
        //         {/* <div className='col'>

        //         </div> */}
        //         {/* <div id="mainContentRegion" className="col">
        //             <div className="dns-settings-header">
        //                 <div>
        //                     <h1>DNS Settings</h1>
        //                     <p>DNS records point to services your domain uses, like forwarding your domain or setting up an email service. <a href="#">Learn more.</a></p>
        //                 </div>
        //                 <button className="button primary">ADD PRESET</button>
        //             </div>

        //             <div className="card">
        //                 <div className="card-header">
        //                     <h2>Squarespace Defaults</h2>
        //                     <button className="delete-icon">🗑️</button>
        //                 </div>
        //                 <table className="dns-table">
        //                     <thead>
        //                         <tr>
        //                             <th>HOST ⓘ</th>
        //                             <th>TYPE ⓘ</th>
        //                             <th>PRIORITY</th>
        //                             <th>TTL ⓘ</th>
        //                             <th>DATA ⓘ</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         <tr>
        //                             <td>@</td>
        //                             <td>A</td>
        //                             <td>N/A</td>
        //                             <td>4 hrs</td>
        //                             <td>198.185.159.144</td>
        //                         </tr>
        //                         <tr>
        //                             <td>www</td>
        //                             <td>CNAME</td>
        //                             <td>2</td>
        //                             <td>4 hrs</td>
        //                             <td>ext-sq.squarespace.com</td>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //             </div>

        //             <div className="card">
        //                 <div className="card-header">
        //                     <h2>Custom records</h2>
        //                     <button className="button secondary">ADD RECORD</button>
        //                 </div>
        //                 <table className="dns-table">
        //                     <thead>
        //                         <tr>
        //                             <th>HOST ⓘ</th>
        //                             <th>TYPE ⓘ</th>
        //                             <th>PRIORITY</th>
        //                             <th>TTL ⓘ</th>
        //                             <th>DATA ⓘ</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         <tr>
        //                             <td>www</td>
        //                             <td>CNAME</td>
        //                             <td>N/A</td>
        //                             <td>4 hrs</td>
        //                             <td>ext-sq.squarespace.com</td>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //             </div>
        //         </div> */}
        //     </div>
        // </div>
    );
} 