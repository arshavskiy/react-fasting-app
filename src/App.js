import React, {useState} from "react";

// import './styles/App.css';

import Counter from "./components/Counter";
import Element from "./components/Element";
import ListItem from "./components/ListItem";

import {
    RangeSelector,
    Stack,
    Box,
    Button,
    Collapsible,
    Heading,
    Grommet,
    ResponsiveContext,
    Footer,
    Text,
    Anchor,
    Sidebar,
    Nav,
    Avatar,
    Meter,
    Select,
    Clock
} from 'grommet';

import {Help, Projects, Notification} from 'grommet-icons'

let startHour = 8;
let endHour = 20;

window.fastingAppGlobals = {
    clock: '',
    values: [startHour, endHour]
}

const theme = {
    global: {
        font: {
            family: 'Roboto', size: '18px', height: '20px',
        },
    },
};
const appTitle = 'Fasting App';
const bodyTypes = ['Slim', 'Medium', 'Large'];
const hoursToFast = [8, 10, 12, 16, 18, 20];
const weights = new Array(80).fill('40');
const age = new Array(65).fill('15')

let ages = age.map((item, i) => {
    return 15 + i;
})
let myWeights = weights.map((item, i) => {
    return 40 + i;
})

const AppBar = (props) => (<Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{left: 'medium', right: 'small', vertical: 'small'}}
    elevation='medium'
    style={{zIndex: '1'}}
    {...props}
/>);

const RangeElm = (props) => {
    const [values, setValues] = useState([10, 18]);
    return (
        <Box>
            <Stack>
                <Box direction="row" justify="between">
                    {hoursToFast.map(value => (
                        <Box key={value} pad="small" border={false}>
                            <Text style={{fontFamily: 'monospace'}}>
                                {value}
                            </Text>
                        </Box>
                    ))}
                </Box>
                <RangeSelector
                    direction="horizontal"
                    invert={false}
                    min={startHour}
                    max={endHour}
                    size="full"
                    round="small"
                    values={values}
                    onChange={values => {
                        console.log('values', values);
                        window.fastingAppGlobals.values = values
                        return setValues(values)
                    }}
                />

            </Stack>
            <Box pad="medium">
                <Text margin={'10px'} alignSelf="center">Fasting time {values[1] - values[0]} hours</Text>
                <Meter
                    max='12'
                    values={[{
                        value: values[1] - values[0],
                        label: 'Fasting time',
                        onClick: () => {
                        }
                    }]}
                    aria-label="meter"
                />
            </Box>
        </Box>
    );
}

const SelectElem = (props) => {
    const [value, setValue] = useState(props.selected);
    return (
        <Select
            options={props.values}
            value={value}
            onChange={({option}) => {
                console.log(option);
                return setValue(option)
            }}
        />
    );
}

const clockChange = e => {
    window.fastingAppGlobals.clock = e;
    window.fastingAppGlobals.clocksValue = window.fastingAppGlobals.clock.split(':')[0].replace('T', '');
    window.fastingAppGlobals.clocksValue = Number(window.fastingAppGlobals.clocksValue);
    if (window.fastingAppGlobals.clocksValue > window.fastingAppGlobals.values[0] && window.fastingAppGlobals.clocksValue < window.fastingAppGlobals.values[1]) {
        window.document.getElementById('clock').style.background = 'red';
    } else {
        window.document.getElementById('clock').style.background = 'initial';
    }
}

function App() {

    const [showSidebar, setShowSidebar] = useState(false);

    let [list, setList] = useState([{name: 'pavel', age: 38, id: 1}, {name: 'david', age: 37, id: 2}, {
        name: 'dina', age: 37, id: 3
    }])

    return (
        <Grommet theme={theme}>
            <Box fill>
                <AppBar>
                    <Heading level='3' margin='none'>{appTitle}</Heading>
                    <Button
                        icon={<Projects/>}
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                </AppBar>

                <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                        flex
                        width='medium'
                        background='light-2'
                        elevation='small'
                        align='center'
                        justify='center'
                    >
                        <Sidebar background="brand" round="small" align="left"
                                 header={<Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"/>}
                                 footer={<Button icon={<Help/>} hoverIndicator/>}
                        >
                            <Nav gap="small">
                                <Button icon={<Projects/>} hoverIndicator/>
                            </Nav>

                            <Box pad={'medium'}>
                                <Text alignSelf="center" margin="small">Body type</Text>
                                <SelectElem values={bodyTypes} selected={bodyTypes[1]}/>
                            </Box>

                            <Box pad={'medium'}>
                                <Text alignSelf="center" margin="small">Age</Text>
                                <SelectElem values={ages} selected={ages[10]}/>
                            </Box>

                            <Box pad={'medium'}>
                                <Text alignSelf="center" margin="small">Weight</Text>
                                <SelectElem values={myWeights} selected={myWeights[Math.floor(myWeights.length / 2)]}/>
                            </Box>

                            {/*<Box pad="medium" background="dark-3">*/}
                            {/*    <Element name="Sara">*/}
                            {/*        <h1>child HTML</h1>*/}
                            {/*    </Element>*/}
                            {/*</Box>*/}
                            {/*<Box pad="medium" background="light-3">*/}
                            {/*    {list.map(person => <ListItem person={person} key={person.id}/>)}*/}
                            {/*</Box>*/}

                        </Sidebar>
                    </Box>
                </Collapsible>

                <Clock id='clock' type="digital" alignSelf="center" pad="large" size='xxlarge' onChange={clockChange}/>

                <Box pad={'medium'}>
                    <Text margin="small" alignSelf='center'>Fasting schedule time</Text>
                    <RangeElm/>
                </Box>


                <Footer background="brand" pad="medium" style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <Text>Copyright</Text>
                    <Anchor label="About"/>
                </Footer>
            </Box>
        </Grommet>);
}

export default App;
