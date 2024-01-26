import Link from "next/link";

interface Data {
  label: string | React.ReactNode;
  value: any;
  linkTo?: string;
}
interface DetailProps {
  data: Data[];
}
export default function CardDetail({ data }: DetailProps) {
  return (
    <>
      <table className="[ table-module-detail ]">
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="capitalize">{row.label}</td>
              <td>
                {row.linkTo ? (
                  <Link className="[ hyperlink ]" href={row?.linkTo}>
                    {row?.value}
                  </Link>
                ) : (
                  row.value
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
