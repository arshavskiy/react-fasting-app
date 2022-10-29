import React from 'react';
import {Box} from 'grommet';

const ListItem = (props) => {

    console.log(props.person);

    return (
        <section>
            <Box>
                {props.person.name}
                {props.person.age}
            </Box>

        </section>

    );
}

export default ListItem;