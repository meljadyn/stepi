import { useState } from 'react';
import {
    Box, FormControl, FormLabel, NumberInput, NumberDecrementStepper,
    NumberIncrementStepper, NumberInputStepper, NumberInputField
} from '@chakra-ui/react';
import { Chart } from 'chart.js';

function GoalChart(props: any) {
    const [goal, setGoal] = useState(0);

    return (
    <>
        <Box {...styles.main}>
            <FormControl>
                <FormLabel>
                    Set your writing goal
                </FormLabel>
                <NumberInput
                    {...styles.num}
                    defaultValue={1667}
                    min={0}
                    max={9999999}
                    step={100}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </Box>

        <Box {...styles.main}>
            <canvas id="goalChart"></canvas>

        </Box>
    </>
    )
}

const styles = {
    main: {
        shadow: "lg",
        width: "max-content",
        padding: "10px",
        borderRadius: "10px",
        margin: "10px auto",
    },

    num: {
        width: "120px",
    }
}

export default GoalChart;
