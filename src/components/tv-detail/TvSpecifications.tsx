
import { TvModel } from "@/data/tvData";
import { useTranslation } from "react-i18next";
import { FeatureTags } from "@/components/tv-card/FeatureTags";
import { HighlightsList } from "@/components/tv-card/HighlightsList";
import { RecommendationBox } from "@/components/tv-card/RecommendationBox";

interface TvSpecificationsProps {
  tv: TvModel;
}

export const TvSpecifications = ({ tv }: TvSpecificationsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{t("tvDetail.specifications")}</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="font-medium mb-2">{t("tvDetail.features")}</h3>
            <FeatureTags features={tv.features} />
          </div>

          {tv.keyFeaturesFull && (
            <div>
              <h3 className="font-medium mb-2">{t("tvDetail.keyFeatures")}</h3>
              <div className="p-4 rounded-md bg-[#001744]/5 dark:bg-[#FFB612]/10">
                <p className="text-sm whitespace-pre-line">
                  {tv.keyFeaturesFull}
                </p>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">{t("tvDetail.highlights")}</h3>
            <HighlightsList highlights={tv.highlights} />
          </div>

          <div>
            <h3 className="font-medium mb-2">{t("tvDetail.recommendation")}</h3>
            <RecommendationBox recommendation={tv.recommendation} />
          </div>
        </div>
      </div>
    </div>
  );
};
