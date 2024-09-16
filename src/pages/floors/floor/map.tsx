import { Tab, Tabs } from '@nextui-org/react';
import { DataType } from './props';
import { IoEye, IoPencil } from 'react-icons/io5';
import FloorMapPreview from './preview';
import FloorEditorMap from './editMap';

export default function FloorMap({ floor }: { floor: DataType }) {
    return (
        <Tabs aria-label='マップ' className='mt-4'>
            <Tab
                key='editor'
                title={
                    <div className='flex items-center gap-1'>
                        <IoPencil />
                        <p>エディター</p>
                    </div>
                }
            >
                <FloorEditorMap floor={floor} />
            </Tab>
            <Tab
                key='preview'
                title={
                    <div className='flex items-center gap-1'>
                        <IoEye />
                        <p>プレビュー</p>
                    </div>
                }
            >
                <FloorMapPreview floor={floor} />
            </Tab>
        </Tabs>
    );
}
