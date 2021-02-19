import Card from 'src/components/Card';
import Divider from 'src/components/Divider';
import Title from 'src/components/Title';
import Typography from 'src/components/Typography';
import Movie from 'src/views/Movie';

export default function Data() {
    return (
        <div className="flex h-screen">
            <Card className="w-screen h-screen lg:w-2/6 m-auto">
                <Title level="h1">Data page</Title>
                <Typography>
                    This really cool movie is user specific!
                </Typography>
                <Divider />
                <Movie />
            </Card>
        </div>
    );
}
