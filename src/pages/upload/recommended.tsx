export default function RecommendedUpload() {
    return (
        <ul className='list-disc ml-7 flex flex-col gap-2 mt-4'>
            <li>
                <p>場所と行事の画像は、16:9で表示されます。</p>
            </li>
            <li>
                <p>
                    催し物の画像は、1:1で表示され、120px×120pxが適しています。
                </p>
            </li>
            <li>
                <p>
                    マップの画像は、1:1で表示されます。SVGファイルが適しています。
                </p>
            </li>
        </ul>
    );
}
