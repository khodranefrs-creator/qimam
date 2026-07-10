import { Metadata } from "next"
import Link from "next/link"
import { getLocale } from '@/i18n/get-locale'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getTranslations(locale)
  return {
    title: t.privacy.title,
    description: t.privacy.description,
  }
}

const privacyContent = {
  ar: [
    { key: 'intro', heading: 'مقدمة', content: 'نحن في شركة قمم اليقين للمحاماة والاستشارات القانونية (يشار إليها فيما يلي بـ "الشركة" أو "نحن" أو "لنا") نلتزم بحماية خصوصية زوار موقعنا الإلكتروني وعملائنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية البيانات الشخصية التي نتحصل عليها من خلال موقعنا الإلكتروني وخدماتنا، وذلك وفقاً لأحكام نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/148) وتاريخ 5/9/1443هـ ولائحته التنفيذية.' },
    { key: 'dataCollection', heading: 'البيانات التي نجمعها', content: 'قد نقوم بجمع الأنواع التالية من البيانات الشخصية عند استخدامك لموقعنا أو الاستفادة من خدماتنا:' },
    { key: 'dataCollectionItems', content: [
      'بيانات التعريف الشخصية: الاسم الكامل، رقم الهوية، الجنسية، تاريخ الميلاد.',
      'بيانات الاتصال: العنوان الوطني، رقم الهاتف، البريد الإلكتروني.',
      'البيانات الوظيفية والمهنية: المؤهلات العلمية، الخبرات العملية، السيرة الذاتية (عند التقديم على وظائف).',
      'بيانات التواصل معنا: محتوى الرسائل والاستفسارات التي ترسلها من خلال نماذج الاتصال أو البريد الإلكتروني.',
      'بيانات الاستخدام: معلومات عن كيفية استخدامك للموقع، بما في ذلك عنوان IP، نوع المتصفح، الصفحات التي تزورها، ومدة الزيارة.',
      'البيانات المالية: بيانات الفواتير ووسائل الدفع (عند استخدام خدماتنا المدفوعة).',
    ]},
    { key: 'legalBasis', heading: 'أساس جمع البيانات الشخصية', content: 'نجمع بياناتك الشخصية بناءً على أحد الأسس القانونية التالية وفقاً لنظام حماية البيانات الشخصية:', items: [
      'الموافقة الصريحة: عند منحك موافقتك الصريحة على جمع بياناتك واستخدامها لغرض محدد.',
      'تنفيذ التزام تعاقدي: عندما يكون جمع البيانات ضرورياً لتنفيذ عقد معك أو لاتخاذ خطوات تمهيدية لإبرام العقد.',
      'الالتزام القانوني: عندما يكون جمع البيانات ضرورياً للامتثال لالتزام قانوني يخضع له المسؤول عن المعالجة.',
      'المصلحة المشروعة: عندما يكون جمع البيانات ضرورياً لتحقيق مصلحة مشروعة للشركة، شريطة ألا تتعدى على حقوقك وحرياتك.',
    ]},
    { key: 'dataUse', heading: 'استخدام البيانات', content: 'نستخدم البيانات الشخصية التي نجمعها للأغراض التالية:', items: [
      'تقديم الخدمات القانونية والاستشارات التي تطلبها.',
      'الرد على استفساراتك وطلباتك وإدارة التواصل معك.',
      'تحسين موقعنا الإلكتروني وتطوير خدماتنا.',
      'إرسال النشرات البريدية والمحتوى القانوني (بعد الحصول على موافقتك).',
      'معالجة طلبات التوظيف والتقديم على الوظائف.',
      'الامتثال للالتزامات القانونية والتنظيمية.',
      'حماية حقوقنا القانونية ومصالحنا المشروعة.',
    ]},
    { key: 'dataProtection', heading: 'حماية البيانات', content: 'نتخذ التدابير الأمنية والتقنية والإدارية المناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الإفشاء أو التعديل أو الإتلاف. تشمل هذه التدابير:', items: [
      'تشفير البيانات أثناء النقل والتخزين باستخدام بروتوكولات آمنة.',
      'تقييد الوصول إلى البيانات الشخصية على أساس الحاجة إلى المعرفة.',
      'تطبيق سياسات صارمة للتحكم في الوصول وإدارة الهوية.',
      'إجراء مراجعات دورية لأنظمة الأمن والحماية.',
      'تدريب موظفينا على أفضل ممارسات حماية البيانات والخصوصية.',
    ]},
    { key: 'dataRetention', heading: 'مدة الاحتفاظ بالبيانات', content: 'نحتفظ ببياناتك الشخصية للمدة اللازمة لتحقيق الغرض الذي جمعت من أجله، أو للمدة التي تتطلبها الأنظمة واللوائح المعمول بها، أيهما أطول.' },
    { key: 'dataSharing', heading: 'مشاركة البيانات والإفصاح عنها', content: 'لا نقوم ببيع بياناتك الشخصية أو مشاركتها مع أطراف ثالثة لأغراض تسويقية. قد نشارك بياناتك في الحالات التالية:', items: [
      'مقدمو الخدمات: مع شركات الطرف الثالث التي تقدم خدمات لنا (مثل استضافة الموارد، خدمات البريد الإلكتروني، معالجة المدفوعات) وذلك بموجب اتفاقيات تحمي بياناتك.',
      'الالتزامات القانونية: عندما يتطلب القانون أو أمر قضائي أو جهة تنظيمية مختصة الإفصاح عن البيانات.',
      'حماية الحقوق: عندما يكون الإفصاح ضرورياً لحماية حقوقنا القانونية أو سلامتنا أو ممتلكاتنا.',
      'الموافقة: في أي حالة أخرى بموافقتك الصريحة.',
    ]},
    { key: 'yourRights', heading: 'حقوقك بخصوص بياناتك الشخصية', content: 'وفقاً لنظام حماية البيانات الشخصية السعودي، يحق لك:', items: [
      'الحق في العلم: بأنه تتم معالجة بياناتك الشخصية والاطلاع على سياسة الخصوصية.',
      'الحق في الوصول: طلب الحصول على نسخة من بياناتك الشخصية التي نحتفظ بها.',
      'الحق في التصحيح: طلب تصحيح أي بيانات شخصية غير دقيقة أو ناقصة.',
      'الحق في الحذف: طلب حذف بياناتك الشخصية في الحالات التي يسمح بها النظام.',
      'الحق في تقييد المعالجة: طلب تقييد معالجة بياناتك في ظروف معينة.',
      'الحق في نقل البيانات: طلب نقل بياناتك الشخصية إلى جهة أخرى.',
      'الحق في الاعتراض: الاعتراض على معالجة بياناتك لأغراض التسويق المباشر أو لأسباب تتعلق بوضعك الخاص.',
      'سحب الموافقة: سحب موافقتك على معالجة بياناتك في أي وقت، دون التأثير على قانونية المعالجة قبل السحب.',
    ]},
    { key: 'cookies', heading: 'ملفات تعريف الارتباط (كوكيز)', content: 'يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل استخدام الموقع. يمكنك التحكم في إعدادات الكوكيز من خلال متصفحك. نستخدم الأنواع التالية من الكوكيز:', items: [
      'كوكيز أساسية: ضرورية لتشغيل الموقع بشكل صحيح.',
      'كوكيز تحليلية: تساعدنا على فهم كيفية استخدام الزوار للموقع.',
      'كوكيز تفضيلية: تذكر تفضيلاتك وإعداداتك لتحسين تجربتك.',
    ]},
    { key: 'thirdParty', heading: 'روابط خارجية', content: 'قد يحتوي موقعنا على روابط لمواقع خارجية لا تخضع لسياسة الخصوصية هذه. نحن غير مسؤولين عن ممارسات الخصوصية أو محتوى تلك المواقع. ننصحك بمراجعة سياسات الخصوصية الخاصة بكل موقع تزوره.' },
    { key: 'internationalTransfer', heading: 'نقل البيانات الدولية', content: 'قد يتم نقل بياناتك الشخصية ومعالجتها في دول أخرى غير المملكة العربية السعودية. عند نقل بياناتك إلى خارج المملكة، سنتخذ التدابير المناسبة لضمان أن تتلاءم حماية البيانات مع المستوى المطلوب بموجب نظام حماية البيانات الشخصية السعودي.' },
    { key: 'dataOfficer', heading: 'مسؤول حماية البيانات', content: 'لقد عينت الشركة مسؤولاً لحماية البيانات الشخصية. يمكنك التواصل معه بخصوص أي استفسار أو طلب يتعلق ببياناتك الشخصية من خلال:', contactItems: [
      'privacy@qimam-law.com',
      '٠٥٦٥٥٥٥٤٣٧',
    ]},
    { key: 'complaints', heading: 'تقديم شكوى', content: 'إذا كنت تعتقد أننا انتهكنا أي حق من حقوقك بموجب نظام حماية البيانات الشخصية، يمكنك تقديم شكوى إلى الجهة المختصة (الهيئة السعودية للبيانات والذكاء الاصطناعي - سدايا) بعد التواصل معنا ومنحنا فرصة معقولة لحل المشكلة.' },
    { key: 'updates', heading: 'تحديثات سياسة الخصوصية', content: 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو المتطلبات القانونية. سنقوم بنشر التحديثات على هذه الصفحة مع تحديث تاريخ "آخر تحديث" في أعلى الصفحة. نشجعك على مراجعة هذه الصفحة بشكل دوري.' },
    { key: 'contact', heading: 'اتصل بنا', content: 'إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه أو ممارساتنا في التعامل مع البيانات الشخصية، يرجى التواصل معنا:', contactItems: [
      'info@qimam-law.com',
      '٠٥٦٥٥٥٥٤٣٧',
      'شارع النسيم العام، مكة المكرمة، المملكة العربية السعودية',
    ]},
  ],
  en: [
    { key: 'intro', heading: 'Introduction', content: 'At Qimam Al-Yaqin Law Firm & Legal Consultations (hereinafter referred to as "the Firm," "we," "us," or "our"), we are committed to protecting the privacy of our website visitors and clients. This Privacy Policy explains how we collect, use, and protect personal data obtained through our website and services, in accordance with the Saudi Personal Data Protection Law issued by Royal Decree No. (M/148) dated 5/9/1443H and its implementing regulations.' },
    { key: 'dataCollection', heading: 'Data We Collect', content: 'We may collect the following types of personal data when you use our website or services:' },
    { key: 'dataCollectionItems', content: [
      'Personal identification data: full name, national ID number, nationality, date of birth.',
      'Contact data: national address, phone number, email address.',
      'Professional and employment data: qualifications, work experience, CV (when applying for jobs).',
      'Communications data: content of messages and inquiries sent through contact forms or email.',
      'Usage data: information about how you use the website, including IP address, browser type, pages visited, and visit duration.',
      'Financial data: billing information and payment methods (when using our paid services).',
    ]},
    { key: 'legalBasis', heading: 'Legal Basis for Data Collection', content: 'We collect your personal data based on one of the following legal grounds under the Personal Data Protection Law:', items: [
      'Explicit consent: when you give your explicit consent to collect and use your data for a specific purpose.',
      'Contractual obligation: when data collection is necessary to fulfill a contract with you or to take pre-contractual steps.',
      'Legal compliance: when data collection is necessary to comply with a legal obligation to which the controller is subject.',
      'Legitimate interest: when data collection is necessary for the legitimate interests of the Firm, provided such interests do not override your rights and freedoms.',
    ]},
    { key: 'dataUse', heading: 'Use of Data', content: 'We use the personal data we collect for the following purposes:', items: [
      'Providing the legal services and consultations you request.',
      'Responding to your inquiries and managing communications with you.',
      'Improving our website and developing our services.',
      'Sending newsletters and legal content (after obtaining your consent).',
      'Processing job applications and recruitment.',
      'Complying with legal and regulatory obligations.',
      'Protecting our legal rights and legitimate interests.',
    ]},
    { key: 'dataProtection', heading: 'Data Protection', content: 'We take appropriate security, technical, and administrative measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. These measures include:', items: [
      'Encryption of data during transmission and storage using secure protocols.',
      'Restricting access to personal data on a need-to-know basis.',
      'Implementing strict access control and identity management policies.',
      'Conducting periodic reviews of security and protection systems.',
      'Training our employees on best practices for data protection and privacy.',
    ]},
    { key: 'dataRetention', heading: 'Data Retention', content: 'We retain your personal data for the duration necessary to fulfill the purpose for which it was collected, or for the period required by applicable laws and regulations, whichever is longer.' },
    { key: 'dataSharing', heading: 'Data Sharing and Disclosure', content: 'We do not sell your personal data or share it with third parties for marketing purposes. We may share your data in the following cases:', items: [
      'Service providers: with third-party companies that provide services to us (such as hosting, email services, payment processing) under agreements that protect your data.',
      'Legal obligations: when required by law, court order, or competent regulatory authority.',
      'Protection of rights: when disclosure is necessary to protect our legal rights, safety, or property.',
      'Consent: in any other case with your explicit consent.',
    ]},
    { key: 'yourRights', heading: 'Your Rights Regarding Your Personal Data', content: 'Under the Saudi Personal Data Protection Law, you have the right to:', items: [
      'Right to know: that your personal data is being processed and to review this Privacy Policy.',
      'Right to access: request a copy of your personal data held by us.',
      'Right to correction: request correction of any inaccurate or incomplete personal data.',
      'Right to deletion: request deletion of your personal data in cases permitted by law.',
      'Right to restrict processing: request restriction of processing of your data under certain circumstances.',
      'Right to data portability: request transfer of your personal data to another entity.',
      'Right to object: object to processing of your data for direct marketing purposes or on grounds relating to your particular situation.',
      'Withdrawal of consent: withdraw your consent to data processing at any time, without affecting the lawfulness of processing before withdrawal.',
    ]},
    { key: 'cookies', heading: 'Cookies', content: 'Our website uses cookies to enhance browsing experience and analyze site usage. You can control cookie settings through your browser. We use the following types of cookies:', items: [
      'Essential cookies: necessary for the proper functioning of the website.',
      'Analytical cookies: help us understand how visitors use the website.',
      'Preference cookies: remember your preferences and settings to improve your experience.',
    ]},
    { key: 'thirdParty', heading: 'External Links', content: 'Our website may contain links to external sites not governed by this Privacy Policy. We are not responsible for the privacy practices or content of those sites. We recommend reviewing the privacy policies of each site you visit.' },
    { key: 'internationalTransfer', heading: 'International Data Transfer', content: 'Your personal data may be transferred to and processed in countries other than the Kingdom of Saudi Arabia. When transferring your data outside the Kingdom, we will take appropriate measures to ensure that data protection complies with the level required under Saudi Personal Data Protection Law.' },
    { key: 'dataOfficer', heading: 'Data Protection Officer', content: 'The Firm has appointed a Data Protection Officer. You may contact them regarding any inquiry or request concerning your personal data through:', contactItems: [
      'privacy@qimam-law.com',
      '+966 56 555 5437',
    ]},
    { key: 'complaints', heading: 'Filing a Complaint', content: 'If you believe we have violated any of your rights under the Personal Data Protection Law, you may file a complaint with the competent authority (Saudi Authority for Data and Artificial Intelligence - SDAIA) after contacting us and giving us a reasonable opportunity to resolve the issue.' },
    { key: 'updates', heading: 'Updates to This Privacy Policy', content: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post updates on this page with an updated "Last Updated" date at the top. We encourage you to review this page periodically.' },
    { key: 'contact', heading: 'Contact Us', content: 'If you have any questions or concerns about this Privacy Policy or our data handling practices, please contact us:', contactItems: [
      'info@qimam-law.com',
      '+966 56 555 5437',
      'Al-Naseem General Street, Makkah, Kingdom of Saudi Arabia',
    ]},
  ],
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)
  const content = privacyContent[locale === 'ar' ? 'ar' : 'en']
  const dateStr = locale === 'ar' ? '١ يناير ٢٠٢٦' : 'January 1, 2026'

  return (
    <div>
      <div className="bg-primary text-text-light py-4 header-offset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/">{t.nav.home}</Link>
            <span>/</span>
            <span className="text-accent-gold">{t.privacy.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-primary text-text-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-heading font-bold mb-4">{t.privacy.title}</h1>
          <div className="w-20 h-[2px] bg-gradient-to-l from-accent-gold to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto">{t.privacy.lastUpdated}: {dateStr}</p>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-border p-8 md:p-12 space-y-8 text-text-dark leading-[1.8]">
            {content.map((section) => (
              <div key={section.key}>
                <h2 className="text-2xl font-heading font-bold leading-[1.15] mb-4 text-primary">{section.heading}</h2>
                <p>{section.content}</p>
                {'items' in section && section.items && (
                  <ul className="list-disc pr-6 mt-3 space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {'contactItems' in section && section.contactItems && (
                  <ul className="list-disc pr-6 mt-3 space-y-2">
                    {section.contactItems.map((item, i) => (
                      <li key={i} dir="ltr" className="text-left rtl:text-right">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
