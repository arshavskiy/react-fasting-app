import React from 'react';
import {Box, Button} from 'grommet';


function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const Element = (props) => {
    return (
        <section>
            <h1>
                <Button primary label='Hello' margin="medium"> {formatName(user)}! </Button>
                <Box>Hello, {props.name}! </Box>
            </h1>
            {props.children}
        </section>

    );
}

export default Element;