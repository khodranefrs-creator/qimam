import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testimonials = [
  {
    name: 'Amro Mohammad',
    content: 'السلام عليكم ورحمة الله وبركاته\nتجربتي مع مكتب المحامي ماجد خالد السواط كانت مميزة جدًا، وجدت المصداقية في التعامل وسرعة الاستجابة واحترافية عالية ولديه فريق عمل مميز، بالإضافة إلى خبرة قانونية كبيرة. أنصح الجميع بالتعامل معهم.\nأفضل مكتب محاماة تعاملت معه، شكرًا للمحامي ماجد خالد السواط وفريقه على سرعة الرد وسرعة الإنجاز.',
    rating: 5,
    source: 'Google Maps',
    featured: true,
    approved: true,
  },
  {
    name: 'maha Sofyani',
    content: 'أتقدم بجزيل الشكر والتقدير لمكتب قمم اليقين للمحاماة على احترافيتهم العالية في متابعة قضيتي، حيث يتم العمل بكل سهولة وإتقان دون أي تقصير، كما أشكرهم على أخلاقهم الراقية وتعاونهم المستمر وحرصهم الدائم على التواصل.',
    rating: 5,
    source: 'Google Maps',
    featured: true,
    approved: true,
  },
  {
    name: 'Misbah alsuwat',
    content: 'احترافية عالية واهتمام بالعميل، تجربة تستحق الشكر والثناء.\nوالشكر موصول للأستاذ ماجد خالد السواط وفريقه على جهودهم وتعاونهم الرائع.',
    rating: 5,
    source: 'Google Maps',
    featured: true,
    approved: true,
  },
  {
    name: 'ABDULMJEED ALLHIBE',
    content: 'أنصح وبكل قوة التعامل معهم وبالذات الأستاذ ماجد. عندهم سرعة في الإنجاز وسرعة في التواصل وإعطائك المعلومات أولاً بأول وتوضيح كل شيء.',
    rating: 5,
    source: 'Google Maps',
    featured: true,
    approved: true,
  },
  {
    name: 'Noor Moalem',
    content: 'من أفضل المحامين، المحامي ماجد إنسان خلوق ومجتهد وملم بجميع الأنظمة. أشكرك على جهودك العالية.',
    rating: 5,
    source: 'Google Maps',
    featured: true,
    approved: true,
  },
  {
    name: 'Saif Alotaibi',
    content: 'أشكر فريق العمل وعلى رأسهم المحامي ماجد السواط على حسن تعاملهم وسرعة الإنجاز.',
    rating: 5,
    source: 'Google Maps',
    featured: true,
    approved: true,
  },
];

async function main() {
  console.log('Seeding 6 Google Maps testimonials...');

  let created = 0;
  let skipped = 0;

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name, content: t.content },
    });

    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: {
          rating: t.rating,
          source: t.source,
          featured: t.featured,
          approved: t.approved,
        },
      });
      skipped++;
      console.log(`  ~ Skipped (already exists, updated): ${t.name}`);
    } else {
      await prisma.testimonial.create({ data: t });
      created++;
      console.log(`  ✓ Created: ${t.name}`);
    }
  }

  console.log(`\nDone. ${created} created, ${skipped} updated.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
