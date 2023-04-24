<template>
  <LandingHeader />
  <section id="hero" class="overflow-hidden text-center md:text-left">
    <div class="text-cafe-600 container">
      <div id="title" class="landing-title flex flex-col">
        <span class="z-30">Des espaces de travail inspirants</span>
        <span class="z-30">Des connexions enrichissantes</span>
        <span class="z-30">Du café.</span>
      </div>
      <div class="flex md:w-110%">
        <div id="text-col" class="mt-4 md:mt-10 md:w-2/3">
          <div class="relative overflow-visible md:hidden">
            <div class="bg-floating-resize bg-shape absolute left-0 top-[-10px] z-0 bg-cafe-200" />
            <img id="hero-pic-mobile" class="relative mx-auto max-w-500px w-90%" :src="hero_pic">
          </div>
          <div id="sub-title" class="landing-subtitle mt-6 md:mt-0">
            Kafo est le réseau qui redonne
            du goût au télétravail
          </div>
          <div id="sub-sub-title" class="z-10 mt-6 text-lg">
            Notre plateforme facilite les rencontres pour les télétravailleurs en quête d'échanges et de collaborations.
          </div>
          <CTA class="mx-auto mt-6 text-xl md:mt-12 sm:text-2xl md:text-3xl lg:text-4xl" />
        </div>
        <div class="relative overflow-visible">
          <div class="bg-floating-resize bg-shape absolute right-[50px] top-[-100px] z-0 hidden bg-cafe-200 md:block" />
          <img id="hero-pic" class="relative hidden md:block lg:-top-20 md:-top-10" :src="hero_pic">
        </div>
      </div>
    </div>
  </section>
  <section id="rencontres" class="from-transparent to-cafe-200 from-50% bg-gradient-to-b text-center">
    <div class="mx-auto w-100 rounded-3xl from-cafe-50 to-cafe-200 to-80% bg-gradient-to-t p-10 md:w-180 sm:h-80">
      <div class="landing-subtitle">
        Faites de nouvelles rencontres
      </div>
      <div class="mt-6 text-lg">
        Cassez la routine et travaillez dans une ambiance conviviale
      </div>
    </div>
    <div class="mx-auto max-w-250 flex flex flex-col justify-around gap-6 md:flex-row">
      <div class="card">
        <img :src="group" class="h-18">
        <div>Explorez nos clubs</div>
        <div>Trouvez des personnes ayant les mêmes centres d'intérêt pour s'entraider, partager des connaissances et créer des opportunités de collaboration.</div>
      </div>
      <div class="card">
        <img :src="casque" class="h-15 w-full">
        <div>Concentré ?</div>
        <div>Indiquez en un clic que vous ne souhaitez pas être dérangé.</div>
      </div>
      <div class="card">
        <img :src="cocktail" class="h-15">
        <div>Après l’effort...</div>
        <div>Indiquez que vous êtes disponible après le travail pour manger un bout ou boire un verre.</div>
      </div>
    </div>
  </section>
  <div id="empty-space" class="h-12 bg-cafe-200 sm:h-32" />
  <section id="annuaire" class="from-cafe-200 to-transparent from-20% bg-gradient-to-b text-center">
    <div class="mx-auto w-100 rounded-3xl from-cafe-200 to-cafe-50 to-60% bg-gradient-to-t p-10 md:w-180 sm:h-80">
      <div class="landing-subtitle">
        Un annuaire aux petits oignons
      </div>
      <div class="mt-6 text-lg">
        Travaillez dans une sélection éclectique de cafés, restaurants, brasseries, coworkings validés par la communauté.
      </div>
    </div>
    <div class="mx-auto max-w-250 flex flex flex-col justify-around gap-6 md:flex-row">
      <div class="card">
        <img :src="table" class="h-18">
        <div>Télétravailleurs bienvenus</div>
        <div>Vous savez par avance que votre présence est bienvenue, vous pouvez vous concentrer sur l’essentiel !</div>
      </div>
      <div class="card">
        <img :src="tasses" class="h-15 w-full">
        <div>Le prix d'un café ?</div>
        <div>Les espaces de coworking proposent un paiement à l'heure, et pour les autres lieux, un café suffit pour profiter pleinement de l'espace.</div>
      </div>
      <div class="card">
        <img :src="notes" class="h-15">
        <div>Calme ou animé</div>
        <div>Choisissez l'ambiance que vous préférez. Fini les mauvaises surprises...</div>
      </div>
    </div>
    <CTA class="mx-auto mt-6 text-lg md:mt-12 sm:text-xl md:text-2xl lg:text-3xl" />
  </section>
  <section id="faq" class="mt-10">
    <div class="mx-auto rounded-3xl from-cafe-200 to-cafe-50 to-50% bg-gradient-to-tl p-8 sm:w-200">
      <div class="landing-subtitle mb-6 text-center">
        Foire aux questions
      </div>
      <div v-for="(question, index) in questions" :key="question.question" class="flex flex-col">
        <div class="flex cursor-pointer" @click="toggle(index)">
          <div
            class="img-default mr-4" i-ci-caret-right-sm :class="{ 'img-rotated': is_open(index) }"
          />
          <div class="mb-2 font-semibold sm:text-lg">
            {{ question.question }}
          </div>
        </div>
        <div v-show="is_open(index)" class="mb-4 text-sm sm:text-base">
          {{ question.answer }}
        </div>
      </div>
    </div>
  </section>
  <section id="contact" class="mx-auto mt-8 container sm:mt-16 sm:flex">
    <img :src="coeur_niais" class="w-1/2 sm:w-1/2">
    <div class="flex flex-col sm:w-1/2">
      <div class="landing-title text-left">
        Une communauté
      </div>
      <div class="landing-subtitle">
        Kafo, c’est vous !
      </div>
      <div>
        Vous construisez le réseau grâce à vos retours.
        Contactez-nous pour ajouter de nouveaux lieux, suggérer des idées ou simplement nous faire part de vos coups de coeur!
      </div>
      <div class="btn">
        Contactez-nous
      </div>
    </div>
  </section>
  <LandingFooter class="mt-20" />
</template>

<script setup lang="ts">
import hero_pic from '@/assets/svg/equipe_5.svg'
import casque from '@/assets/svg/casque.svg'
import group from '@/assets/svg/group.svg'
import cocktail from '@/assets/svg/cocktail.svg'
import table from '@/assets/svg/table.svg'
import tasses from '@/assets/svg/tasses.svg'
import notes from '@/assets/svg/notes.svg'
import coeur_niais from '@/assets/svg/coeur_niais.svg'

const open_indexes: Ref<number[]> = ref([])

function toggle(index: number) {
  if (open_indexes.value.includes(index)) {
    open_indexes.value = open_indexes.value.filter(i => i !== index)
  } else {
    open_indexes.value.push(index)
  }
}

function is_open(index: number) {
  return open_indexes.value.includes(index)
}

const questions = ref([{
  question: 'Puis-je passer des appels ?',
  answer: 'Pas de problème dans les établissements “Animés”, selon votre meilleur jugement dans les “Calmes”, dans le respect des autres !',
},
{
  question: 'A quoi correspondent les trois niveaux de bruits ?',
  answer: 'Studieux : Atmosphère silencieuse, comme une bibliothèque. Calme : Niveau sonore contenu, bavardages et calls discrets autorisés. Animé : Tout ce qui est plus fort ! Beaucoup d\'espaces \'animés\' sont en réalité plutôt calmes hors des heures de pointes.',
},
{
  question: 'Allez-vous bientôt couvrir d\'autres villes ?',
  answer: 'Oui, nous sommes en train de développer notre réseau dans d\'autres villes (Lyon, Lille, Nantes...). Si tu as de bons plans à partager, nous sommes tout ouïe !',
},
{
  question: 'Combien ça coûte ?',
  answer: 'Kafo est gratuit :)',
},
{
  question: 'Est-ce que je peux réserver ma place ? ',
  answer: 'Non, il s\'agit juste de signaler que vous êtes intéressé par le créneau.',
},
{
  question: 'Chocolatine ou pain au chocolat ?',
  answer: 'Le débat linguistique autour des appellations \'pain au chocolat\' et \'chocolatine\' est ancré dans l\'histoire et la culture françaises. Si cette querelle semble futile pour certains, elle revêt en réalité une importance stratégique pour les startups, et c\'est précisément ce que cet essai se propose d\'explorer. Nous nous pencherons sur les raisons pour lesquelles l\'appellation \'pain au chocolat\' s\'avère supérieure à \'chocolatine\' dans le contexte entrepreneurial, sans pour autant mépriser ceux qui préfèrent l\'autre terme. Tout d\'abord, il est indéniable que l\'appellation \'pain au chocolat\' jouit d\'une popularité et d\'une universalité qui la rendent plus adaptée au monde des startups. En effet, selon une étude menée en 2021 par Le Parisien, près de 84% des Français utilisent le terme \'pain au chocolat\' tandis que seulement 16% emploient \'chocolatine\'. Dans un contexte entrepreneurial où la communication et l\'accessibilité sont cruciales, il est donc judicieux de miser sur le terme le plus répandu et compréhensible par la majorité. Ensuite, il convient de souligner que l\'appellation \'pain au chocolat\' a l\'avantage d\'évoquer immédiatement les ingrédients-clés du produit : le pain et le chocolat. Cette clarté est primordiale pour une startup qui doit, dès sa phase de lancement, être en mesure de capter l\'attention et susciter l\'intérêt de sa cible. La simplicité et l\'efficacité du terme \'pain au chocolat\' sont donc des atouts majeurs pour une entreprise qui vise à s\'imposer sur un marché concurrentiel. Par ailleurs, il est important de considérer l\'envergure internationale des startups, qui cherchent souvent à conquérir des marchés étrangers. Dans cette perspective, l\'appellation \'pain au chocolat\' présente un avantage indéniable. En effet, elle est plus facilement comprise et assimilée par les non-francophones que \'chocolatine\', qui peut sembler obscure ou déroutante pour ceux qui ne sont pas familiers avec le français. Ainsi, le terme \'pain au chocolat\' contribue à renforcer l\'image d\'une startup dynamique et tournée vers l\'international. Enfin, choisir l\'appellation \'pain au chocolat\' peut également devenir une marque de fabrique pour une startup, lui permettant de se démarquer dans un secteur où l\'innovation et l\'originalité sont clés. En assumant pleinement cette appellation, la startup envoie un message fort sur son attachement à la tradition et à la qualité, tout en adoptant une approche moderne et accessible. Cela peut se traduire par une identité visuelle forte, des actions marketing percutantes et une offre de produits qui va au-delà du simple pain au chocolat. En somme, il apparaît évident que l\'appellation \'pain au chocolat\' présente de nombreux avantages pour une startup, tant au niveau national qu\'international. Sa popularité, son évocation claire des ingrédients-clés, son rayonnement à l\'étranger et la possibilité d\'en faire une marque de fabrique sont autant d\'atouts qui plaident en faveur de cette appellation. Toutefois, il est essentiel de rappeler que le respect des préférences locales et régionales demeure primordial. Dans cette optique, une startup peut parfaitement proposer une version \'chocolatine\' de ses produits pour satisfaire les attentes de tous ses clients.',
}])
</script>

<style scoped>
.landing-title {
  @apply text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold;
}

.landing-subtitle {
  @apply text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold;
}

.card {
  @apply w-4/5 min-w-auto w-70 sm:h-70 p-4 mx-auto bg-cafe-50 rounded-3xl;
}

.card>img {
  @apply mx-auto mb-4;
}

.card>div {
  @apply text-lg font-bold;
}

.card>div+div {
  @apply text-sm font-normal;
}

.bg-floating-resize {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
}

.bg-shape {
  @apply rounded-tl-[439px] rounded-bl-[139px] rounded-tr-[139px];
}

.img-rotated {
  transform: rotate(90deg);
  transition: all 0.2s;
}
</style>
