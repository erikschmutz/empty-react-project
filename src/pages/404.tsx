import { useHistory } from 'react-router-dom';
import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Divider from 'src/components/Divider';
import Title from 'src/components/Title';
import Typography from 'src/components/Typography';
import { Navigator } from 'src/utils/Navigator';

export default function F0F() {
    const history = useHistory();

    return (
        <div className="flex h-screen">
            <Card className="w-screen h-screen lg:h-4/6 lg:w-2/6 m-auto">
                <Title level="h1">
                    Page not
                    <br /> found
                </Title>
                <Typography>
                    It seems that you trying to find a page which does not
                    exist. Please enter one of the following buttons below to be
                    navigated to a more interesting view
                </Typography>
                <Divider />
                <Button
                    onClick={(e) => {
                        history.push(Navigator.build({ path: '/login' }));
                    }}
                    className="float-right"
                >
                    Go to login
                </Button>
            </Card>
        </div>
    );
}
