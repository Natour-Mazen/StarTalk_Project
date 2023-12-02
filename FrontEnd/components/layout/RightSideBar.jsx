import '../../assets/css/components/layout/RightSideBar.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function RightSideBar()
{
    return (
        <div className="three-dimensions-rightside">

            <div className="p-inputgroup flex-1">
                <Button icon="pi pi-search" />
                <InputText placeholder="Search a Citation" />
            </div>

            <div className="mt-3"/>

            <Card title="Title">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
            </Card>

            <div className="mt-3"></div>

            <Card title="Title2" subTitle="Subtitle" >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandaeLorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>

            <div className="mb-2"></div>

        </div>
    );
}