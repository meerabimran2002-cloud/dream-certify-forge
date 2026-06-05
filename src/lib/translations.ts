export type LangCode = "en" | "ur" | "ar" | "hi" | "fr" | "de" | "es" | "tr" | "zh";

export const LANGS: { code: LangCode; label: string; rtl?: boolean }[] = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو", rtl: true },
  { code: "ar", label: "العربية", rtl: true },
  { code: "hi", label: "हिन्दी" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "tr", label: "Türkçe" },
  { code: "zh", label: "中文" },
];

type T = {
  certificate: string;
  ofCompletion: string;
  presentedTo: string;
  forCompleting: string;
  awardedOn: string;
  certificateId: string;
  founder: string;
  academyName: string;
  tagline: string;
  verifiedBy: string;
};

export const translations: Record<LangCode, T> = {
  en: { certificate: "Certificate", ofCompletion: "of Completion", presentedTo: "This certificate is proudly presented to", forCompleting: "for successfully completing the course", awardedOn: "Awarded on", certificateId: "Certificate ID", founder: "Founder & Director", academyName: "Dream Team Academy", tagline: "Code · Learn · Grow", verifiedBy: "Verified by Dream Team Academy" },
  ur: { certificate: "سرٹیفکیٹ", ofCompletion: "تکمیل کا", presentedTo: "یہ سرٹیفکیٹ فخریہ پیش کیا جاتا ہے", forCompleting: "کورس کی کامیاب تکمیل پر", awardedOn: "جاری کرنے کی تاریخ", certificateId: "سرٹیفکیٹ نمبر", founder: "بانی و ڈائریکٹر", academyName: "ڈریم ٹیم اکیڈمی", tagline: "کوڈ · سیکھیں · بڑھیں", verifiedBy: "ڈریم ٹیم اکیڈمی کی توثیق شدہ" },
  ar: { certificate: "شهادة", ofCompletion: "إتمام", presentedTo: "تُمنح هذه الشهادة بكل فخر إلى", forCompleting: "لإتمامه بنجاح دورة", awardedOn: "تاريخ المنح", certificateId: "رقم الشهادة", founder: "المؤسس والمدير", academyName: "أكاديمية دريم تيم", tagline: "برمج · تعلم · انمُ", verifiedBy: "موثقة من أكاديمية دريم تيم" },
  hi: { certificate: "प्रमाणपत्र", ofCompletion: "पूर्णता का", presentedTo: "यह प्रमाणपत्र गर्व से प्रदान किया जाता है", forCompleting: "पाठ्यक्रम सफलतापूर्वक पूर्ण करने पर", awardedOn: "प्रदान तिथि", certificateId: "प्रमाणपत्र संख्या", founder: "संस्थापक एवं निदेशक", academyName: "ड्रीम टीम अकादमी", tagline: "कोड · सीखें · बढ़ें", verifiedBy: "ड्रीम टीम अकादमी द्वारा सत्यापित" },
  fr: { certificate: "Certificat", ofCompletion: "de Réussite", presentedTo: "Ce certificat est fièrement décerné à", forCompleting: "pour avoir terminé avec succès le cours", awardedOn: "Décerné le", certificateId: "N° de certificat", founder: "Fondateur et Directeur", academyName: "Dream Team Academy", tagline: "Coder · Apprendre · Grandir", verifiedBy: "Vérifié par Dream Team Academy" },
  de: { certificate: "Zertifikat", ofCompletion: "der Vollendung", presentedTo: "Dieses Zertifikat wird stolz verliehen an", forCompleting: "für den erfolgreichen Abschluss des Kurses", awardedOn: "Verliehen am", certificateId: "Zertifikat-Nr.", founder: "Gründer & Direktor", academyName: "Dream Team Academy", tagline: "Coden · Lernen · Wachsen", verifiedBy: "Verifiziert von Dream Team Academy" },
  es: { certificate: "Certificado", ofCompletion: "de Finalización", presentedTo: "Este certificado se otorga con orgullo a", forCompleting: "por completar con éxito el curso", awardedOn: "Otorgado el", certificateId: "ID de certificado", founder: "Fundador y Director", academyName: "Dream Team Academy", tagline: "Codifica · Aprende · Crece", verifiedBy: "Verificado por Dream Team Academy" },
  tr: { certificate: "Sertifika", ofCompletion: "Tamamlama", presentedTo: "Bu sertifika gururla takdim edilir", forCompleting: "kursunu başarıyla tamamladığı için", awardedOn: "Veriliş tarihi", certificateId: "Sertifika No", founder: "Kurucu ve Direktör", academyName: "Dream Team Academy", tagline: "Kodla · Öğren · Büyü", verifiedBy: "Dream Team Academy tarafından doğrulanmıştır" },
  zh: { certificate: "证书", ofCompletion: "结业", presentedTo: "此证书自豪地颁发给", forCompleting: "成功完成以下课程", awardedOn: "颁发日期", certificateId: "证书编号", founder: "创始人兼总监", academyName: "梦之队学院", tagline: "编码 · 学习 · 成长", verifiedBy: "由梦之队学院认证" },
};
