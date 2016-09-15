/*
 * VelocityDamper.h
 *
 *  Created on: 28.01.2015
 *      Author: aschaeffer
 */

#ifndef SRC_ENGINE_ENTITY_SUBSYSTEM_PARTICLE_MODIFIER_VELOCITY_DAMPER_H_
#define SRC_ENGINE_ENTITY_SUBSYSTEM_PARTICLE_MODIFIER_VELOCITY_DAMPER_H_

#include "../../../EntitySystemBase.hpp"
#include "../../../domain/graph/EntityFunction.hpp"
#include "../../../domain/graph/EntityInstance.hpp"
#include "../ParticleModel.hpp"

namespace inexor {
namespace entity {
namespace particle {

    class VelocityDamper : public EntityFunction
    {
        public:

            VelocityDamper();
            virtual ~VelocityDamper();

            void Execute(TimeStep time_step, EntityInstance* modifier, EntityInstance* particle);

        private:

            // Include the default reference counting implementation.
            IMPLEMENT_REFCOUNTING(VelocityDamper);
    };

}
}
}

#endif /* SRC_ENGINE_ENTITY_SUBSYSTEM_PARTICLE_MODIFIER_VELOCITY_DAMPER_H_ */
