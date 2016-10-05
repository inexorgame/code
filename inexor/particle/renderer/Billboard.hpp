/*
 * Billboard.h
 *
 *  Created on: 08.02.2015
 *      Author: aschaeffer
 */

#ifndef ENTITY_SUBSYSTEM_PARTICLE_RENDERER_BILLBOARD_H_
#define ENTITY_SUBSYSTEM_PARTICLE_RENDERER_BILLBOARD_H_

#include "inexor/entity/EntitySystemBase.hpp"
#include "inexor/particle/subsystem/ParticleSubsystem.hpp"
#include "inexor/entity/EntitySystem.hpp"
#include "inexor/entity/domain/graph/EntityFunction.hpp"
#include "inexor/util/Logging.hpp"

namespace inexor {
namespace entity {
namespace particle {

    class Billboard : public EntityFunction
    {
        public:

            Billboard();
            virtual ~Billboard();

            /**
             * Executed before particles are rendered.
             * @param time_step The time step.
             * @param renderer_inst The renderer instance.
             */
            void Before(TimeStep time_step, std::shared_ptr<EntityInstance> renderer_inst);

            /**
             * Executed for each particle.
             * @param time_step The time step.
             * @param renderer_inst The renderer instance.
             * @param particle_inst The particle instance.
             */
            AttributeRefPtr Execute(TimeStep time_step, std::shared_ptr<EntityInstance> renderer_inst, std::shared_ptr<EntityInstance> particle_inst);

            /**
             * Executed after particles are rendered.
             * @param time_step The time step.
             * @param renderer_inst The renderer instance.
             */
            void After(TimeStep time_step, std::shared_ptr<EntityInstance> renderer_inst);

        private:

            Shader *shader;
            Texture *tex;

    };

}
}
}

#endif /* ENTITY_SUBSYSTEM_PARTICLE_RENDERER_BILLBOARD_H_ */