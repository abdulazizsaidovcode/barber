import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const { t } = useTranslation()
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              {t('siderbar_dashboard')} /
            </Link>
          </li>
          <li className="font-medium dark:text-white text-graydark underline">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
