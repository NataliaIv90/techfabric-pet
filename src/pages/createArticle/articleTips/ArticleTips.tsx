import { ListTitle, TipsListItem, BoldText } from './ArticleTips.styled';
const articleTips = [
  { title: 'Know your audience', description: 'Understand who your target audience is and tailor your content to their interests, preferences, and needs.This will help you connect with your readers on a deeper level.' },
  { title: 'Craft a compelling headline', description: 'Your headline is the first thing readers see, so make it attention - grabbing and relevant to the content.A strong headline can entice users to click and read your post.' },
  { title: 'Start with a hook', description: 'Begin your post with a captivating introduction that immediately captures the reader\'s attention. Whether it\'s a thought - provoking question, a fascinating anecdote, or a surprising statistic, the hook should create curiosity and encourage them to keep reading.' },
  { title: 'Structure your content', description: 'Organize your blog post into clear sections with subheadings.This helps readers skim the content easily and find what they\'re looking for. Use bullet points, lists, and visuals to enhance readability.' },
  { title: 'Focus on quality over quantity', description: 'It\'s better to create valuable and insightful content rather than lengthy, wordy posts. Aim to provide useful information, practical tips, or entertaining stories that resonate with your audience.' },
  { title: 'Use visuals', description: 'Incorporate relevant images, infographics, or videos to make your blog post visually appealing and engaging.Visuals can help break up text and convey information more effectively.' },
  { title: 'Keep it concise', description: 'Be clear and concise in your writing.Avoid unnecessary jargon or complicated language.Keep paragraphs and sentences relatively short to maintain reader interest.' },
  { title: 'Use a conversational tone', description: 'Write as if you\'re having a conversation with your readers. Avoid being overly formal and use a friendly, approachable tone that matches your brand or personality.' }
];

export const ArticleTips = () => (
  <>
    <ListTitle>A few tips on how to create an article:</ListTitle>
    <ol>
      {articleTips.map(({ title, description }, index) => {
        return (
          <TipsListItem key={index}>
            <BoldText>{title}: </BoldText>{description}
          </TipsListItem>
        )
      })}
    </ol>
  </>

);
